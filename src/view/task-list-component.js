import { createElement } from "../framework/render.js";

function createTaskListComponentTemplate() {
    return `
        <div class="column backlog">
            <div class="column-header">Бэклог</div>
            <div class="task-list" id="backlog">
                <!-- Tasks will be inserted here -->
            </div>
        </div>
    `;
}

export default class TaskListComponent {
    getTemplate() {
        return createTaskListComponentTemplate();
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
}