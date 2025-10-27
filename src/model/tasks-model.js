import Observable from '../framework/observable.js';
import { UpdateType, UserAction } from '../const.js';

export default class TasksModel extends Observable {
    #tasksApiService = null;
    #boardTasks = [];

    constructor({ tasksApiService }) {
        super();
        this.#tasksApiService = tasksApiService;
    }

    get tasks() {
        return this.#boardTasks;
    }

    getTasksByStatus(status) {
        return this.#boardTasks.filter(task => task.status === status);
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardTasks = tasks;
        } catch (err) {
            this.#boardTasks = [];
        }
        this._notify(UpdateType.INIT);
    }

    async addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: Date.now().toString(),
        };

        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardTasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch (err) {
            console.error('Ошибка при добавлении задачи на сервер:', err);
            throw err;
        }
    }

    async updateTaskStatus(taskId, newStatus) {
        const task = this.#boardTasks.find(task => task.id === taskId);
        if (task) {
            const previousStatus = task.status;
            task.status = newStatus;

            try {
                const updatedTask = await this.#tasksApiService.updateTask(task);
                Object.assign(task, updatedTask);
                this._notify(UserAction.UPDATE_TASK, task);
            } catch (err) {
                console.error('Ошибка при обновлении статуса задачи на сервер:', err);
                task.status = previousStatus;
                throw err;
            }
        }
    }

    async clearBasket() {
        const basketTasks = this.#boardTasks.filter(task => task.status === 'basket');
        try {
            await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
            this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'basket');
            this._notify(UserAction.DELETE_TASK, { status: 'basket' });
        } catch (err) {
            console.error('Ошибка при удалении задач из корзины на сервере:', err);
            throw err;
        }
    }

    hasBasketTasks() {
        return this.#boardTasks.some(task => task.status === 'basket');
    }
}