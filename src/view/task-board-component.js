import { createElement } from "../framework/render.js";

function createTaskBoardComponentTemplate() {
    return `
        <div class="columns-container">
            <div class="columns">
                <!-- Columns will be inserted here -->
            </div>
        </div>
    `;
}

export default class TaskBoardComponent {
    getTemplate() {
        return createTaskBoardComponentTemplate();
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

    getColumnsContainer() {
        return this.getElement().querySelector('.columns');
    }
}