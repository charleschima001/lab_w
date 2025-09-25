import { createElement } from "../framework/render.js";

function createFormAddTaskComponentTemplate() {
    return `
        <div class="new-task-container">
            <h3>Новая задача</h3>
            <div class="input-group">
                <input type="text" id="taskInput" placeholder="Название задачи...">
                <button id="addBtn">+ Добавить</button>
            </div>
        </div>
    `;
}

export default class FormAddTaskComponent {
    getTemplate() {
        return createFormAddTaskComponentTemplate();
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