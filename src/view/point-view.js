import {calculateDuration, humanizePointDate} from '../utils/point';
import AbstractView from '../framework/view/abstract-view';

const createOffersTemplates = (allOffers, checkedOffers) => {
  let result = '';
  allOffers.forEach((offer) => {
    if (checkedOffers.includes(offer.id)) {
      result += `<li class="event__offer"><span class="event__offer-title">${offer.title}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span></li>`;
    }
  });
  return result;
};

export const pointView = (point, destinations, offersIds) => {
  const {type, destination, startDate, endDate, price, isFavorite, offers} = point;
  const dateFrom = startDate !== null ? humanizePointDate(startDate, 'HH:mm') : '';
  const dateTo = endDate !== null ? humanizePointDate(endDate, 'HH:mm') : '';
  const date = startDate !== null ? humanizePointDate(startDate, 'MMM D') : '';
  const allTypeOffers = offersIds.find((offer) => offer.type === type);
  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';
  const destinationData = destinations.find((dest) => dest.id === destination);
  return(`<li class="trip-events__item">
        <div class="event">
          <time class="event__date" dateTime="2019-03-18">${date}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${destinationData.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" dateTime="2019-03-18T10:30">${dateFrom}</time>
              &mdash;
              <time class="event__end-time" dateTime="2019-03-18T11:00">${dateTo}</time>
            </p>
            <p class="event__duration">${calculateDuration(startDate, endDate)}</p>
          </div>
          <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
          ${createOffersTemplates(allTypeOffers.offers, offers)}
          </ul>
          <button class="event__favorite-btn ${favoriteClass}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path
                d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
  </li>`);
};

export default class PointView extends AbstractView{
  #point = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;
  #destinations = null;
  #offers = null;
  constructor({point, onEditClick, onFavoriteClick, destinations, offers}){
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#destinations = destinations;
    this.#offers = offers;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template(){
    return pointView(this.#point, this.#destinations, this.#offers);
  }

  #editClickHandler = (event) => {
    event.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (event) => {
    event.preventDefault();
    this.#handleFavoriteClick();
  };
}
