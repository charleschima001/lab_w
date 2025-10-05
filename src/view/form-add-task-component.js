import { AbstractComponent } from "../framework/view/abstract-component.js";

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

export default class FormAddTaskComponent extends AbstractComponent {
    get template() {
        return createFormAddTaskComponentTemplate();
    }
}