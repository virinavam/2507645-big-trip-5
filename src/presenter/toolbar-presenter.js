import {render} from '../render.js';
import FilterView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';

export default class ToolbarPresenter {
  filterComponent = new FilterView();
  sortComponent = new SortView();

  filterContainer = null;
  contentContainer = null;

  constructor({filterContainer, contentContainer}) {
    this.filterContainer = filterContainer;
    this.contentContainer = contentContainer;
  }

  init() {
    render(this.filterComponent, this.filterContainer);
    render(this.sortComponent, this.contentContainer);
  }
}
