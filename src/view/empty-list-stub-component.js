import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEmptyListStubTemplate() {
    return `
        <div class="empty-list-stub">
            <p>Нет задач</p>
        </div>
    `;
}

export default class EmptyListStubComponent extends AbstractComponent {
    get template() {
        return createEmptyListStubTemplate();
    }
}