import AbstractView from '../framework/view/abstract-view';

const createTripList = () => (
  `<ul class="trip-events__list">
  </ul>`
);

class TripListView extends AbstractView{
  get template(){
    return createTripList();
  }
}

export default TripListView;
