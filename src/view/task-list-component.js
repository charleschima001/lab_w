import { createElement } from "../framework/render.js";

function createTaskListComponentTemplate(status, statusLabel) {
    return `
        <div class="column ${status}">
            <div class="column-header">${statusLabel}</div>
            <div class="task-list" data-status="${status}">
                <!-- Tasks will be inserted here -->
            </div>
        </div>
    `;
}

export default class TaskListComponent {
    constructor({ status, statusLabel }) {
        this.status = status;
        this.statusLabel = statusLabel;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.status, this.statusLabel);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }

    removeElement() {
        this.element = null;
    }

    getTaskListElement() {
        return this.getElement().querySelector('.task-list');
    }
}