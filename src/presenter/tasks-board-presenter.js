import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import ClearBasketButtonComponent from '../view/clear-basket-button-component.js';
import EmptyListStubComponent from '../view/empty-list-stub-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = null;
    #boardTasks = [];

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksBoardComponent = new TaskBoardComponent();
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard();
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);
        
        const statuses = [Status.BACKLOG, Status.PROCESSING, Status.DONE, Status.BASKET];
        
        statuses.forEach(status => {
            this.#renderTasksList(status);
        });
    }

    #renderTasksList(status) {
        const tasksForStatus = this.#tasksModel.getTasksByStatus(status);
        const taskListComponent = new TaskListComponent({
            status: status,
            label: StatusLabel[status]
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
        const clearBasketButton = new ClearBasketButtonComponent();
        render(clearBasketButton, container);
    }

    #renderEmptyListStub(container) {
        const emptyStubComponent = new EmptyListStubComponent();
        render(emptyStubComponent, container);
    }
}