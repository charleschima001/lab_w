import { tasks as initialTasks } from '../mock/task.js';

export default class TasksModel {
  #tasks = [];
  #observers = [];

  constructor() {
    this.#tasks = [...initialTasks];
  }

  get tasks() {
    return this.#tasks;
  }

  getTasksByStatus(status) {
    return this.#tasks.filter(task => task.status === status);
  }

  addTask(title) {
    const newTask = {
      id: Date.now().toString(),
      title: title,
      status: 'backlog'
    };
    this.#tasks.push(newTask);
    this._notifyObservers();
  }

  updateTaskStatus(taskId, newStatus) {
    const task = this.#tasks.find(task => task.id === taskId);
    if (task) {
      task.status = newStatus;
      this._notifyObservers();
    }
  }

  clearBasket() {
    this.#tasks = this.#tasks.filter(task => task.status !== 'basket');
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  _notifyObservers() {
    this.#observers.forEach(observer => observer());
  }
}