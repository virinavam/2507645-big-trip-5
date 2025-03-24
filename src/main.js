import ToolbarPresenter from './presenter/toolbar-presenter.js';
import ContentPresenter from './presenter/content-presenter.js';

const infoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const toolbarPresenter = new ToolbarPresenter({filterContainer, contentContainer});

const contentPresenter = new ContentPresenter({infoContainer, contentContainer});

toolbarPresenter.init();
contentPresenter.init();
