import AbstractView from '../framework/view/abstract-view';
import {NoPointsTextType} from '../const';

export const createNoPoint = (filterType) => {
  const noPointTextValue = NoPointsTextType[filterType];
  return(
    `<p class="trip-events__msg">${noPointTextValue}</p>`
  );
};

const CreateFetchError = () =>
  `<p class="trip-events__msg">
       Failed to load latest route information
  </p >
  `;

export default class ZeroPointsView extends AbstractView {
  #filterType = null;
  #isFetchError = null;

  constructor({filterType, isFetchError = false}) {
    super();
    this.#filterType = filterType;
    this.#isFetchError = isFetchError;
  }

  get template(){
    if (this.#isFetchError) {
      return CreateFetchError();
    }
    return createNoPoint(this.#filterType);
  }
}

