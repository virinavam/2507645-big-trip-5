import {getRandomTask} from '../mock/mock.js';

const TASK_COUNT = 22;

export default class TasksModel {
  #tasks = Array.from({length: TASK_COUNT}, getRandomTask);

  getTasks() {
    return this.#tasks;
  }
}
