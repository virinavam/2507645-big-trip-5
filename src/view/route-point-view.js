import AbstractView from '../framework/view/abstract-view.js';

function createRoutePointElement(routePoint) {
  const routePointElement = document.createElement('div');
  routePointElement.classList.add('route-point');

  const title = document.createElement('h2');
  title.textContent = `Тип маршрута: ${routePoint.type}`;
  routePointElement.appendChild(title);

  const destination = document.createElement('div');
  destination.classList.add('destination');
  destination.innerHTML = `
    <h3>${routePoint.destination.name}</h3>
    <p>${routePoint.destination.description}</p>
    <p>Город: ${routePoint.destination.city}</p>
    <img src="${routePoint.destination.photos[0]}" alt="${routePoint.destination.name}" />
  `;
  routePointElement.appendChild(destination);

  const options = document.createElement('ul');
  options.classList.add('options');
  routePoint.options.forEach(option => {
    const optionItem = document.createElement('li');
    optionItem.textContent = `${option.name} - ${option.price} руб.`;
    options.appendChild(optionItem);
  });
  routePointElement.appendChild(options);

  return routePointElement;
}

export default class RoutePointView extends AbstractView {
  #container = null;

  constructor(container) {
    super();
    this.#container = container;
  }

  get template() {
    return '';
  }

  renderRoutePoints(routePoints) {
    this.#container.innerHTML = '';

    routePoints.forEach(routePoint => {
      const routePointElement = createRoutePointElement(routePoint);
      this.#container.appendChild(routePointElement);
    });
  }
}
