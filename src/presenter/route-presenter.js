import { RoutePointView } from '../view/route-point-view.js';
import { generateMockData } from '../model/mock-data.js';

export class RoutePointPresenter {
  constructor(view) {
    this.view = view;
    this.routePoints = [];
  }

  loadRoutePoints() {
    this.routePoints = generateSampleData();
    this.render();
  }

  render() {
    this.view.renderRoutePoints(this.routePoints);
  }
}
