import AbstractView from '../framework/view/abstract-view.js';

function createEventTemplate(trip) {
  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="${trip.date}">${trip.formattedDate}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="${trip.icon}" alt="Event type icon">
              </div>
              <h3 class="event__title">${trip.title}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${trip.startTime}">${trip.formattedStartTime}</time>
                  &mdash;
                  <time class="event__end-time" datetime="${trip.endTime}">${trip.formattedEndTime}</time>
                </p>
                <p class="event__duration">${trip.duration}</p>
              </div>
              <p class="event__price">&euro;&nbsp;<span class="event__price-value">${trip.price}</span></p>
              <button class="event__favorite-btn ${trip.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`;
}

export default class TripEventView extends AbstractView {
  #trip = null;
  #handleEditClick = null;

  constructor({ trip, onEditClick }) {
    super();
    this.#trip = trip;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createEventTemplate(this.#trip);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
