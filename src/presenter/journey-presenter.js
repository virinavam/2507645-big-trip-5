import {remove, render, RenderPosition} from '../framework/render';
import TripListView from '../view/event-list-view';
import Sorting from '../view/sort-view';
import ZeroPointsView from '../view/zero-points-view';
import PointPresenter from './point-presenter';
import {sortPointsByType} from '../utils/common';
import {filterByType} from '../utils/filters';
import {FilterType, SortTypes, TimeLimit, UpdateType, UserAction} from '../const';
import NewPointPresenter from './new-point-presenter';
import LoadingView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import PointsInfoView from '../view/points-info-view';

class JourneyPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersModel = null;
  #component = new TripListView();
  #sortComponent = null;
  #loadingComponent = new LoadingView();
  #tripInfoComponent = null;
  #noPoint = null;
  #pointPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = SortTypes.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #headerContainer = document.querySelector('.trip-main');
  #isLoading = true;
  #isFetchError = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({container, pointsModel, destinationsModel, offersModel, filtersModel, onNewPointDestroy}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#component.element,
      onFavoriteChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleModelEvent,
    });
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
  }

  get points() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterByType[this.#filterType](points);
    sortPointsByType[this.#currentSortType](filteredPoints);
    return filteredPoints;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  createPoint() {
    this.#currentSortType = SortTypes.DEFAULT;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    render(this.#component, this.#container);
    this.#newPointPresenter.init();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (error) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (error) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (error) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data = null) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        if (data && data.error) {
          this.#isFetchError = true;
        }
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new Sorting({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#component.element,
      onFavoriteChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    this.#noPoint = new ZeroPointsView({
      filterType: this.#filterType,
    });
    render(this.#noPoint, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderFetchError() {
    this.#noPoint = new ZeroPointsView({
      filterType: this.#filterType,
      isFetchError: this.#isFetchError
    });
    render(this.#noPoint, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderTripInfo() {
    const points = this.points;
    this.#tripInfoComponent = new PointsInfoView({
      points: points,
      destinations: [...this.#destinationsModel.destinations],
      offers: [...this.#offersModel.offers]
    });
    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    const points = this.points;
    const pointsCount = points.length;
    if (this.#isFetchError) {
      this.#renderFetchError();
      return;
    }
    if (pointsCount === 0 && !this.#isLoading) {
      this.#renderNoPoints();
      return;
    }
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderTripInfo();
    this.#renderSort();
    render(this.#component, this.#container);
    this.#renderPoints(points);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#tripInfoComponent);
    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPoint) {
      remove(this.#noPoint);
    }
    if (resetSortType) {
      this.#currentSortType = SortTypes.DEFAULT;
    }
  }
}
export default JourneyPresenter;
