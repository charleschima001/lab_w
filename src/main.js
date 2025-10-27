import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render } from './framework/render.js';
import TasksModel from './model/tasks-model.js'; // Updated path
import TasksApiService from './task-api-service.js'; // Updated path

// Get your actual URL from mockAPI and replace YOUR_ID
const END_POINT = 'https://68fecf3fe02b16d1753b7560.mockapi.io/'; // Your actual URL

const tasksApiService = new TasksApiService(END_POINT);
const tasksModel = new TasksModel({
    tasksApiService: tasksApiService
});

const presenter = new TasksBoardPresenter({
    boardContainer: document.querySelector('.task-board'),
    tasksModel: tasksModel
});

function handleNewTaskButtonClick() {
    presenter.createTask();
}

render(new HeaderComponent(), document.querySelector('.header-container'));
render(new FormAddTaskComponent({
    onClick: handleNewTaskButtonClick
}), document.querySelector('.form-container'));

presenter.init();