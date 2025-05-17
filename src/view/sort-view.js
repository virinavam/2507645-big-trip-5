import AbstractView from '../framework/view/abstract-view';
import {SortTypes} from '../const';


const sortingView = (currentSortType) => (
  `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
              value="sort-day" data-sort-type="${SortTypes.DEFAULT}" ${currentSortType === SortTypes.DEFAULT ? 'checked' : ''}>
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
              value="sort-time" data-sort-type="${SortTypes.TIME}" ${currentSortType === SortTypes.TIME ? 'checked' : ''}>
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
              value="sort-price" data-sort-type="${SortTypes.PRICE}" ${currentSortType === SortTypes.PRICE ? 'checked' : ''}>
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
  </form>
  `
);
export default class SortingView extends AbstractView{
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template(){
    return sortingView(this.#currentSortType);
  }

  #sortTypeChangeHandler = (event) => {
    if (event.target.tagName !== 'INPUT'){
      return;
    }
    event.preventDefault();
    this.#handleSortTypeChange(event.target.dataset.sortType);
  };
}
