import BaseView from './base-view.js';
const createFilterTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>
    <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
class FiltersView extends BaseView {
  getTemplate() {
    return createFilterTemplate();
  }
}
export default FiltersView;
