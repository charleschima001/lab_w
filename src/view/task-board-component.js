import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskBoardComponentTemplate() {
    return `
        <div class="columns-container">
            <div class="columns">
                <!-- Columns will be inserted here -->
            </div>
        </div>
    `;
}

export default class TaskBoardComponent extends AbstractComponent {
    get template() {
        return createTaskBoardComponentTemplate();
    }

    getColumnsContainer() {
        return this.element.querySelector('.columns');
    }
}