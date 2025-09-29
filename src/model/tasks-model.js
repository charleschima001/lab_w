import { tasks } from '../mock/task.js';

export default class TasksModel {
    #boardTasks = tasks;

    getTasks() {
        return this.#boardTasks;
    }

    getTasksByStatus(status) {
        return this.#boardTasks.filter(task => task.status === status);
    }
}