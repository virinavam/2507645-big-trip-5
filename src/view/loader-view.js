import AbstractView from '../framework/view/abstract-view.js';

function createLoaderTemplate() {
  return '<p class="trip-events__msg"></p>';
}

export default class LoaderView extends AbstractView {
  get template() {
    return createLoaderTemplate();
  }
}
