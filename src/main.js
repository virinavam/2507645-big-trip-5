import ToolbarPresenter from './presenter/toolbar-presenter.js';
import ContentPresenter from './presenter/content-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import TasksModel from './model/task-model.js';

const infoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');
const tasksModel = new TasksModel();
const boardPresenter = new BoardPresenter({ boardContainer: contentContainer, tasksModel });

const toolbarPresenter = new ToolbarPresenter({
  filterContainer,
  contentContainer
});
const contentPresenter = new ContentPresenter({
  infoContainer,
  contentContainer
});

toolbarPresenter.init();
contentPresenter.init();
boardPresenter.init();
