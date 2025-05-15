import ApiService from '../framework/api-service.js';
import {ApiServiceMethod} from '../const';

export default class PointsApiService extends ApiService{
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: ApiServiceMethod.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addPoint(point){
    const response = await this._load({
      url:'points',
      method: ApiServiceMethod.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: ApiServiceMethod.DELETE,
    });
    return response;
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'base_price': point.price,
      'date_from': point.startDate instanceof Date ? point.startDate.toISOString() : null,
      'date_to': point.endDate instanceof Date ? point.endDate.toISOString() : null,
      'is_favorite': point.isFavorite
    };

    delete adaptedPoint.price;
    delete adaptedPoint.startDate;
    delete adaptedPoint.endDate;
    delete adaptedPoint.isFavorite;
    return adaptedPoint;
  }
}
