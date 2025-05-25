import JourneyPresenter from './presenter/journey-presenter';
import TripPointModel from './model/trip-point-model';
import DestinationModel from './model/destinations-model';
import OfferModel from './model/offers-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewPointButtonView from './view/new-point-button-view';
import {render} from './framework/render';
import PointsApiService from './api-service/points-api';
import DestinationsApiService from './api-service/destinations-api';
import OffersApiService from './api-service/offers-api';

const AUTHORIZATION = 'Basic MgcGFglT6u44dg32wFFp';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const tripContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const pointsModel = new TripPointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OfferModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
const filtersModel = new FilterModel();
const tripPresenter = new JourneyPresenter({
  container: tripContainer,
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
  filtersModel: filtersModel,
  onNewPointDestroy: newPointCloseHandler
});
const filterPresenter = new FilterPresenter({
  filterContainer: headerContainer.querySelector('.trip-controls__filters'),
  filterModel: filtersModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: NewPointButtonClickHandler
});

function newPointCloseHandler() {
  newPointButtonComponent.enableButton();
}

function NewPointButtonClickHandler() {
  tripPresenter.createPoint();
  newPointButtonComponent.disableButton();
}

render(newPointButtonComponent, headerContainer);

filterPresenter.init();
tripPresenter.init();
offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().then(() => {
      newPointButtonComponent.enableButton();
    });
  });
});
