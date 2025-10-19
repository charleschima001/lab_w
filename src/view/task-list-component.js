import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListComponentTemplate(status, label) {
    return `
        <div class="column ${status}">
            <div class="column-header">${label}</div>
            <div class="task-list" data-status="${status}"></div>
        </div>
    `;
}

export default class TaskListComponent extends AbstractComponent {
    #status = null;
    #label = null;
    #onTaskDrop = null;

    constructor({ status, label, onTaskDrop }) {
        super();
        this.#status = status;
        this.#label = label;
        this.#onTaskDrop = onTaskDrop;
        this.#setDropHandler();
    }

    get template() {
        return createTaskListComponentTemplate(this.#status, this.#label);
    }

    getTaskListElement() {
        return this.element.querySelector('.task-list');
    }

    #setDropHandler() {
        const container = this.getTaskListElement();
        
        container.addEventListener('dragover', (event) => {
            event.preventDefault();
            container.classList.add('drag-over');
            console.log('Drag over:', this.#status);
        });

        container.addEventListener('dragleave', () => {
            container.classList.remove('drag-over');
        });

        container.addEventListener('drop', (event) => {
            event.preventDefault();
            container.classList.remove('drag-over');
            
            const taskId = event.dataTransfer.getData('text/plain');
            console.log('Drop event - Task ID:', taskId, 'Target Status:', this.#status);
            
            if (this.#onTaskDrop && taskId) {
                this.#onTaskDrop(taskId, this.#status);
            } else {
                console.error('Drop failed - no task ID or handler');
            }
        });

        console.log('Drop handler set for:', this.#status);
    }
}