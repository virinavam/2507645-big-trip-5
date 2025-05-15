import PointView from '../view/point-view';
import EditingPointView from '../view/edit-point-view';
import {remove, render, replace} from '../framework/render';
import {Mode, UpdateType, UserAction} from '../const';

export default class PointPresenter{
  #pointListContainer = null;
  #handleFavoriteChange = null;
  #handleModeChange = null;
  #pointComponent = null;
  #editPointComponent = null;
  #point = null;
  #mode = Mode.DEFAULT;
  #destinationsModel = null;
  #offersModel = null;
  #destinations = null;
  #offers = null;
  constructor({pointListContainer, destinationsModel, offersModel, onFavoriteChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleFavoriteChange = onFavoriteChange;
    this.#handleModeChange = onModeChange;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init = (point) => {
    this.#point = point;
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    const previousPointComponent = this.#pointComponent;
    const previousEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
      destinations: this.#destinations,
      offers: this.#offers
    });
    this.#editPointComponent = new EditingPointView({
      point: this.#point,
      onFormSubmit: this.#handleSubmitForm,
      onDeleteClick: this.#handleDeleteClick,
      destinations: this.#destinations,
      offers: this.#offers,
      onRollUpClick: this.#replaceEditPointToPoint,
    });

    if (previousPointComponent === null || previousEditPointComponent === null){
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT){
      replace(this.#pointComponent, previousPointComponent);
    }

    if (this.#mode === Mode.EDITING){
      replace(this.#pointComponent, previousEditPointComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(previousPointComponent);
    remove(previousEditPointComponent);
  };

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }
    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    this.#editPointComponent.shake(resetFormState);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditPointToPoint();
    }
  }

  #replacePointToEditPoint = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceEditPointToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (event) => {
    if(event.key === 'Escape' || event.key === 'Esc'){
      event.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditPointToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleFavoriteChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replacePointToEditPoint();
  };

  #handleSubmitForm = (update) => {
    this.#handleFavoriteChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update);
  };

  #handleDeleteClick = (point) => {
    this.#handleFavoriteChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
