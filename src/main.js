import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.app');
const formContainer = document.querySelector('.form-container');
const taskBoardContainer = document.querySelector('.task-board');

// Render header at the top
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

// Render form
render(new FormAddTaskComponent(), formContainer);

// Render task board
const taskBoardComponent = new TaskBoardComponent();
render(taskBoardComponent, taskBoardContainer);

// Get the columns container where we'll add the task lists
const columnsContainer = taskBoardComponent.getElement().querySelector('.columns');

// Create and render 4 columns with 4 tasks each (like your friend's code)
for (let j = 0; j < 4; j++) {
    const taskListComponent = new TaskListComponent();
    render(taskListComponent, columnsContainer);
    
    // Get the task list container for this column
    const taskListElement = taskListComponent.getElement().querySelector('.task-list');
    
    // Add 4 "Выучить JS" tasks to each column
    for (let i = 0; i < 4; i++) {
        render(new TaskComponent(), taskListElement);
    }
}

// Add functionality to the form
setTimeout(() => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    
    if (addBtn && taskInput) {
        addBtn.addEventListener('click', () => {
            if (taskInput.value.trim() !== "") {
                // Add new task to the first backlog column
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