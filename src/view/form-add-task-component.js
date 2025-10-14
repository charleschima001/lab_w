
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTaskComponentTemplate() {
    return `
        <form class="new-task-container">
            <h3>Новая задача</h3>
            <div class="input-group">
                <input type="text" id="add-task" placeholder="Название задачи..." required>
                <button type="submit">+ Добавить</button>
            </div>
        </form>
    `;
}

export default class FormAddTaskComponent extends AbstractComponent {
    #handleClick = null;

    constructor({ onClick }) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler);
    }

    get template() {
        return createFormAddTaskComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    };
}