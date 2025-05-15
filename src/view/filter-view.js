import AbstractView from '../framework/view/abstract-view';
import {upperFirst} from '../utils/common';

const createFiltersElements = (filters, currentFilterType) => {
  let filtersTemplates = '';
  filters.map((filter) => {
    const {type, name, count} = filter;
    const checked = type === currentFilterType ? 'checked' : '';
    const disabled = count === 0 ? 'disabled' : '';
    filtersTemplates += `<div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
        value="${type}" ${checked} ${disabled}>
        <label class="trip-filters__filter-label" for="filter-${name}">${upperFirst(name)}</label>
        </div>`;
  }).join('');
  return filtersTemplates;
};

const createFilters = (filters, currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
      ${createFiltersElements(filters, currentFilterType)}
      <button class="visually-hidden" type="submit">Accept filter</button>
     </form>`
);
export default class FiltersView extends AbstractView{
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;
  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template(){
    return createFilters(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (event) => {
    event.preventDefault();
    this.#handleFilterTypeChange(event.target.value);
  };
}
