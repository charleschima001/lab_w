import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
    const { title, status } = task;
    return `
        <div class="task task--${status}">
            ${title}
        </div>
    `;
}

export default class TaskComponent extends AbstractComponent {
    #task = null;

    constructor(task) {
        super();
        this.#task = task;
        this.#makeTaskDraggable();
    }

    get template() {
        return createTaskComponentTemplate(this.#task);
    }

    #makeTaskDraggable() {
        this.element.setAttribute('draggable', 'true');
        
        this.element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', this.#task.id);
            this.element.classList.add('dragging');
        });

        this.element.addEventListener('dragend', () => {
            this.element.classList.remove('dragging');
        });
    }
}