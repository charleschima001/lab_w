import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/tasks-model.js';


const appContainer = document.querySelector('.app');
const headerContainer = document.querySelector('.header-container');
const formContainer = document.querySelector('.form-container');
const taskBoardContainer = document.querySelector('.task-board');

console.log('Containers found:', {
    appContainer: !!appContainer,
    headerContainer: !!headerContainer,
    formContainer: !!formContainer,
    taskBoardContainer: !!taskBoardContainer
});

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: taskBoardContainer,
    tasksModel,
});

if (headerContainer) {
    render(new HeaderComponent(), headerContainer);
} else {
    console.error('Header container not found!');
}

if (formContainer) {
    render(new FormAddTaskComponent(), formContainer);
} else {
    console.error('Form container not found!');
}

if (taskBoardContainer) {
    tasksBoardPresenter.init();
} else {
    console.error('Task board container not found!');
}
