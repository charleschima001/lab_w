import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListComponentTemplate(status, label) {
    return `
        <div class="column ${status}">
            <div class="column-header">${label}</div>
            <div class="task-list" data-status="${status}">
                <!-- Tasks will be inserted here -->
            </div>
        </div>
    `;
}

export default class TaskListComponent extends AbstractComponent {
    #status = null;
    #label = null;

    constructor({ status, label }) {
        super();
        this.#status = status;
        this.#label = label;
    }

    get template() {
        return createTaskListComponentTemplate(this.#status, this.#label);
    }

    getTaskListElement() {
        return this.element.querySelector('.task-list');
    }
}