import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import ClearBasketButtonComponent from '../view/clear-basket-button-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();
    #boardTasks = [];

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.getTasks()];
        
        render(this.#tasksBoardComponent, this.#boardContainer);
        
        const columnsContainer = this.#tasksBoardComponent.getColumnsContainer();
        
        // Create lists for all four statuses
        const statuses = [Status.BACKLOG, Status.PROCESSING, Status.DONE, Status.BASKET];
        
        statuses.forEach(status => {
            const taskListComponent = new TaskListComponent({
                status: status,
                statusLabel: StatusLabel[status]
            });
            
            render(taskListComponent, columnsContainer);
            
            // Get tasks for this specific status
            const tasksForStatus = this.#tasksModel.getTasksByStatus(status);
            
            // Render each task in the appropriate list
            tasksForStatus.forEach(task => {
                const taskComponent = new TaskComponent({ task });
                render(taskComponent, taskListComponent.getTaskListElement());
            });

            // Add clear basket button only for basket column
            if (status === Status.BASKET) {
                const clearBasketButton = new ClearBasketButtonComponent();
                render(clearBasketButton, taskListComponent.getElement());
            }
        });
    }
}