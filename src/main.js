import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.app');
const formContainer = document.querySelector('.form-container');
const taskBoardContainer = document.querySelector('.task-board');


render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);


render(new FormAddTaskComponent(), formContainer);


const taskBoardComponent = new TaskBoardComponent();
render(taskBoardComponent, taskBoardContainer);


const columnsContainer = taskBoardComponent.getElement().querySelector('.columns');


for (let j = 0; j < 4; j++) {
    const taskListComponent = new TaskListComponent();
    render(taskListComponent, columnsContainer);
    
    
    const taskListElement = taskListComponent.getElement().querySelector('.task-list');
    
    
    for (let i = 0; i < 4; i++) {
        render(new TaskComponent(), taskListElement);
    }
}


setTimeout(() => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    
    if (addBtn && taskInput) {
        addBtn.addEventListener('click', () => {
            if (taskInput.value.trim() !== "") {
            
                const firstBacklog = document.querySelector('.task-list');
                if (firstBacklog) {
                    const taskElement = document.createElement('div');
                    taskElement.className = 'task';
                    taskElement.textContent = taskInput.value;
                    firstBacklog.appendChild(taskElement);
                    taskInput.value = "";
                }
            }
        });

        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addBtn.click();
            }
        });
    }
}, 100);
