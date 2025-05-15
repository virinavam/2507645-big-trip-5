import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class OfferModel extends Observable{
  #offersApiService = null;
  #offers = [];
  constructor({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;
  }

  get offers(){
    return this.#offers;
  }

  async init(){
    try{
      this.#offers = await this.#offersApiService.offers;
      this._notify(UpdateType.INIT);
    } catch (error){
      this.#offers = null;
      this._notify(UpdateType.INIT, {error});
    }
  }
}
