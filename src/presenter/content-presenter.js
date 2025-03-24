import {RenderPosition, render} from '../render.js';
import TripInfoView from '../view/content/trip-info-view.js';
import EventsView from '../view/content/trip-events-view.js';
import EventView from '../view/content/trip-event-view.js';
import EventEditorView from '../view/content/edit-form-view.js';

const POINTS_COUNT = 3;

export default class ContentPresenter {
  tripInfoComponent = new TripInfoView();
  eventsComponent = new EventsView();
  eventComponent = new EventView();
  eventEditorComponent = new EventEditorView();

  infoContainer = null;
  contentContainer = null;

  constructor({infoContainer, contentContainer}) {
    this.infoContainer = infoContainer;
    this.contentContainer = contentContainer;
  }

  init() {
    render(this.tripInfoComponent, this.infoContainer, RenderPosition.AFTERBEGIN);
    render(this.eventsComponent, this.contentContainer);
    render(this.eventEditorComponent, this.eventsComponent.getElement());

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(this.eventComponent, this.eventsComponent.getElement());
    }
  }
}
