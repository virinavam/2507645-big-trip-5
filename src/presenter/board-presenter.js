import { render, replace, remove } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import EmptyPageView from '../view/empty-page-view.js';
import FiltersView from '../view/filters-view.js';
import LoaderView from '../view/loader-view.js';
import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripInfoView from '../view/trip-info-view.js';

const TRIP_COUNT_PER_STEP = 8;

export default class BoardPresenter {
  #boardContainer = null;
  #tripsModel = null;

  #tripInfoComponent = new TripInfoView();
  #filtersComponent = new FiltersView();
  #sortComponent = new SortView();
  #loaderComponent = new LoaderView();
  #emptyPageComponent = new EmptyPageView();

  #boardTrips = [];
  #renderedTripCount = TRIP_COUNT_PER_STEP;

  constructor({ boardContainer, tripsModel }) {
    this.#boardContainer = boardContainer;
    this.#tripsModel = tripsModel;
  }

  init() {
    this.#boardTrips = [...this.#tripsModel.getTrips()];
    this.#renderBoard();
  }

  #handleLoadMoreButtonClick = () => {
    this.#boardTrips
      .slice(
        this.#renderedTripCount,
        this.#renderedTripCount + TRIP_COUNT_PER_STEP,
      )
      .forEach((trip) => this.#renderTrip(trip));
    this.#renderedTripCount += TRIP_COUNT_PER_STEP;
  };

  #renderTrip(trip) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripComponent = new TripEventView({
      trip,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const tripEditComponent = new EditFormView({
      trip,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replaceCardToForm() {
      replace(tripEditComponent, tripComponent);
    }

    function replaceFormToCard() {
      replace(tripComponent, tripEditComponent);
    }

    render(tripComponent, this.#boardContainer);
  }

  #renderBoard() {
    render(this.#tripInfoComponent, this.#boardContainer);
    render(this.#filtersComponent, this.#boardContainer);
    render(this.#sortComponent, this.#boardContainer);
    render(this.#loaderComponent, this.#boardContainer);

    setTimeout(() => {
      remove(this.#loaderComponent);

      if (this.#boardTrips.length === 0) {
        render(this.#emptyPageComponent, this.#boardContainer);
        return;
      }

      for (
        let i = 0;
        i < Math.min(this.#boardTrips.length, TRIP_COUNT_PER_STEP);
        i++
      ) {
        this.#renderTrip(this.#boardTrips[i]);
      }
    }, 2000);
  }
}
