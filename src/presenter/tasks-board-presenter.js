import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import ClearBasketButtonComponent from '../view/clear-basket-button-component.js';
import EmptyListStubComponent from '../view/empty-list-stub-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel, UserAction, UpdateType } from '../const.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = null;

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksBoardComponent = new TaskBoardComponent();
        
        this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
    }

    async init() {
        // Wait for model to load data from API
        await this.#tasksModel.init();
        // Then render the board
        this.#renderBoard();
    }

    #renderBoard() {
        // Clear the board first
        this.#boardContainer.innerHTML = '';
        
        // Render the board component
        render(this.#tasksBoardComponent, this.#boardContainer);
        
        // Render all columns with tasks
        this.#renderColumns();
    }

    #renderColumns() {
        const columnsContainer = this.#tasksBoardComponent.getColumnsContainer();
        columnsContainer.innerHTML = ''; 
        
        const statuses = [Status.BACKLOG, Status.PROCESSING, Status.DONE, Status.BASKET];
        
        statuses.forEach(status => {
            this.#renderTasksList(status);
        });
    }

    #renderTasksList(status) {
        const tasksForStatus = this.#tasksModel.getTasksByStatus(status);
        const taskListComponent = new TaskListComponent({
            status: status,
            label: StatusLabel[status],
            onTaskDrop: this.#handleTaskDrop.bind(this)
        });
        
        render(taskListComponent, this.#tasksBoardComponent.getColumnsContainer());
        
        if (tasksForStatus.length === 0) {
            this.#renderEmptyListStub(taskListComponent.getTaskListElement());
        } else {
            tasksForStatus.forEach(task => {
                this.#renderTask(task, taskListComponent.getTaskListElement());
            });
        }

        if (status === Status.BASKET) {
            this.#renderClearButton(taskListComponent.element);
        }
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent(task);
        render(taskComponent, container);
    }

    #renderClearButton(container) {
        const clearBasketButton = new ClearBasketButtonComponent({
            onClick: this.#handleClearBasket.bind(this)
        });
        render(clearBasketButton, container, 'beforeend');
    }

    #renderEmptyListStub(container) {
        const emptyStubComponent = new EmptyListStubComponent();
        render(emptyStubComponent, container);
    }

    #handleModelEvent(event, payload) {
        // Re-render columns when model changes
        this.#renderColumns();
    }

    async #handleClearBasket() {
        await this.#tasksModel.clearBasket();
    }

    async #handleTaskDrop(taskId, newStatus) {
        await this.#tasksModel.updateTaskStatus(taskId, newStatus);
    }

    async createTask() {
        const taskInput = document.querySelector('#add-task');
        if (!taskInput) {
            return;
        }
        
        const taskTitle = taskInput.value.trim();
        if (!taskTitle) {
            return;
        }

        await this.#tasksModel.addTask(taskTitle);
        taskInput.value = '';
    }
}