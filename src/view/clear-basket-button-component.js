
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createClearBasketButtonTemplate() {
    return `
        <button class="clear-basket-btn">
            × Очистить
        </button>
    `;
}

export default class ClearBasketButtonComponent extends AbstractComponent {
    #handleClick = null;

    constructor({ onClick }) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }

    get template() {
        return createClearBasketButtonTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    };
}