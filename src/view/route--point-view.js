export class RoutePointView {
  constructor(container) {
    this.container = container;
  }

  renderRoutePoints(routePoints) {
    this.container.innerHTML = '';

    routePoints.forEach(routePoint => {
      const routePointElement = this.createRoutePointElement(routePoint);
      this.container.appendChild(routePointElement);
    });
  }

  createRoutePointElement(routePoint) {
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
}
