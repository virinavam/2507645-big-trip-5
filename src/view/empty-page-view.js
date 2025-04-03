import AbstractView from '../framework/view/abstract-view.js';

function createEmptyPageTemplate() {
  return '<p class="trip-events__msg">Click «ADD NEW EVENT» in menu to create your first event</p>';
}

export default class EmptyPageView extends AbstractView {
  get template() {
    return createEmptyPageTemplate();
  }
}
