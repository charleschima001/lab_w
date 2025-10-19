import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render } from './framework/render.js';
import TasksModel from './model/tasks-model.js'; 

const tasksModel = new TasksModel();
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
console.log(' App started successfully!');