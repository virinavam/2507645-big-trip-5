import { RoutePointPresenter } from './presenter';
import { RoutePointView } from './route-point-view';

const container = document.getElementById('route-points-container');

const view = new RoutePointView(container);
const presenter = new RoutePointPresenter(view);

presenter.loadRoutePoints();
