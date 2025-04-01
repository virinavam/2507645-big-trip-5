import { RoutePresenter } from './presenter/route-presenter.js';
import { RouteModel } from './model/route-model.js';

const model = new RouteModel();
const container = document.querySelector('#route-container');

const presenter = new RoutePresenter({
  container,
  model,
});

presenter.init();
