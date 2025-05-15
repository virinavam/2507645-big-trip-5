import {humanizePointDate} from '../utils/point';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {TYPES} from '../const';
import {upperFirst} from '../utils/common';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import he from 'he';

const BLANK_POINT = {
  type: TYPES[0],
  destination: 1,
  startDate: dayjs(),
  endDate: dayjs(),
  price: null,
  isFavorite: false,
  offers: []
};

const generateDestinations = (destinations, isDisabled) => {
  let destinationsTemplate = '';
  destinations.forEach((destination) => {
    destinationsTemplate += `<option value="${destination.name}" ${isDisabled ? 'disabled' : ''}></option>`;
  });
  return destinationsTemplate;
};

const createOffersTemplates = (allOffers, checkedOffers, isDisabled) => {
  if (allOffers.length === 0) {
    return '';
  } else {
    let offersTemplates = '';
    allOffers.forEach((offer) => {
      const checked = checkedOffers.includes(offer.id) ? 'checked' : '';
      offersTemplates += `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox"
      name="event-offer-luggage" ${checked} ${isDisabled ? 'disabled' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
    });
    return offersTemplates;
  }
};

const createTypesTemplates = (currentType, isDisabled) => {
  let typesTemplates = '';
  TYPES.map((type) => {
    const checked = currentType === type ? 'checked' : '';
    typesTemplates += `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
    value="${type}" ${checked} ${isDisabled ? 'disabled' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${upperFirst(type)}</label>
    </div>`;
  }).join('');
  return typesTemplates;
};

const createPhotosTemplates = (destinationPhotos) => {
  let photosTemplates = '';
  if (destinationPhotos !== ''){
    photosTemplates = destinationPhotos.map((photo) => (`<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)).join('');
  }
  return photosTemplates;
};

export const editingPointView = (point, destinations, offersIds, isNewPoint) => {
  const {type, destination, startDate, endDate, price, offers, isSaving, isDeleting, isDisabled} = point;
  const dateFrom = startDate !== null ? humanizePointDate(startDate, 'DD/MM/YY HH:mm') : '';
  const dateTo = endDate !== null ? humanizePointDate(endDate, 'DD/MM/YY HH:mm') : '';
  const allTypeOffers = offersIds.find((offer) => offer.type === type);
  const destinationData = destinations.find((dest) => dest.id === destination);
  return(`<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createTypesTemplates(type)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${destination}">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${destination}"
                    type="text" name="event-destination" value="${destinationData ? he.encode(destinationData.name) : ''}"
                    list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
                    <datalist id="destination-list-1" ${isDisabled ? 'disabled' : ''}>
                     ${generateDestinations(destinations, isDisabled)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text"
                    name="event-start-time" value="${dateFrom}" ${isDisabled ? 'disabled' : ''}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text"
                    name="event-end-time" value="${dateTo}" ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price"
                    value="${price}" ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
                  ${isNewPoint ? '<button class="event__reset-btn" type="reset">Cancel</button>' :
      `<button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button">`}
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                       ${createOffersTemplates(allTypeOffers.offers, offers, isDisabled)}
                    </div>
                  </section>

                  ${destinationData ? `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationData.description}</p>
                     <div class="event__photos-container">
                     <div class="event__photos-tape">
                     ${createPhotosTemplates(destinationData.pictures)}
                    </div>
                    </div>
                    </section>` : ''}
                </section>
              </form>
  </li>`
  );
};
export default class EditingPointView extends AbstractStatefulView{
  #point = null;
  #handleFormSubmit = null;
  #handleEditClick = null;
  #handleDeleteClick = null;
  #handleRollUpClick = null;
  #destinations = null;
  #offers = null;
  #datepicker = null;
  #isNewPoint = null;
  constructor({ point = BLANK_POINT, onFormSubmit, onDeleteClick, destinations, offers, onRollUpClick, isNewPoint}){
    super();
    this.#point = point;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditClick = onFormSubmit;
    this.#handleRollUpClick = onRollUpClick;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isNewPoint = isNewPoint;
    this.#handleDeleteClick = onDeleteClick;
    this._state = EditingPointView.parsePointToState(point);
    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();
    if(this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  get template(){
    return editingPointView(this._state, this.#destinations, this.#offers, this.#isNewPoint);
  }

  #formSubmitHandler = (event) => {
    event.preventDefault();
    this.#handleFormSubmit(EditingPointView.parseStateToPoint(this._state));
  };

  #rollUpClickHandler = (event) => {
    event.preventDefault();
    this.#handleRollUpClick(this.#point);
  };

  #deleteClickHandler = (event) => {
    event.preventDefault();
    this.#handleDeleteClick(EditingPointView.parseStateToPoint(this._state));
  };

  #changeTypeHandler = (event) => {
    event.preventDefault();
    this.updateElement({
      type: event.target.value,
      offers: []
    });
  };

  #ChangeStartDateHandler = ([startDate]) => {
    this.updateElement({
      startDate: startDate
    });
  };

  #ChangeEndDateHandler = ([endDate]) => {
    this.updateElement({
      endDate: endDate
    });
  };

  #ChangePriceHandler = (event) => {
    event.preventDefault();
    const inputPrice = Number(event.target.value);
    this.updateElement({
      price: inputPrice >= 0 ? inputPrice : 0
    });
  };

  #changeDestinationHandler = (event) => {
    event.preventDefault();
    const destination = this.#destinations.find((dest) => dest.name === event.target.value);
    if(destination) {
      this.updateElement({
        destination: destination.id,
      });
    }
  };

  #changeOfferHandler = (event) => {
    event.preventDefault();
    const offerId = event.target.id.replace('event-offer-', '');
    const newOffers = [...this._state.offers];
    const offerIndex = newOffers.findIndex((id) => id === offerId);
    if (offerIndex > -1) {
      newOffers.splice(offerIndex, 1);
    } else {
      newOffers.push(offerId);
    }
    this._setState({
      offers: newOffers,
    });
    this.updateElement(this._state);
  };

  #setStartDatepicker() {
    if (this._state.startDate) {
      this.#datepicker = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.startDate,
          maxDate: this._state.endDate,
          onChange: this.#ChangeStartDateHandler,
        },
      );
    }
  }

  #setEndDatepicker() {
    if (this._state.endDate) {
      this.#datepicker = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.endDate,
          minDate: this._state.startDate,
          onChange: this.#ChangeEndDateHandler,
        },
      );
    }
  }

  static parsePointToState = (point) => ({
    ...point,
    startDate: dayjs(point.startDate).toDate(),
    endDate: dayjs(point.endDate).toDate(),
    isDisabled: false,
    isSaving: false,
    isDeleting: false
  });

  static parseStateToPoint = (state) => {
    const point = {...state};
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  };

  reset(point) {
    this.updateElement(
      EditingPointView.parsePointToState(point)
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    if (!this.#isNewPoint) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpClickHandler);
    }
    this.element.querySelector('.event__type-list').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#changeOfferHandler);
    this.element.querySelector('.event__input').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#ChangePriceHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }
}
