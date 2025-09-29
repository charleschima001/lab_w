import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/tasks-model.js';

const bodyContainer = document.querySelector('.app');
const headerContainer = document.querySelector('.header-container'); // Get the header container
const formContainer = document.querySelector('.form-container');
const tasksBoardContainer = document.querySelector('.task-board');

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: tasksBoardContainer,
    tasksModel,
});

// Render header directly into the header-container div
render(new HeaderComponent(), headerContainer);

render(new FormAddTaskComponent(), formContainer);

tasksBoardPresenter.init();