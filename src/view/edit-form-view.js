import AbstractView from '../framework/view/abstract-view.js';

function createEventEditorTemplate(routePoint) {
  const { destination, options } = routePoint;
  const optionsHtml = options.map(option => `
    <li>
      <input type="text" value="${option.name}" placeholder="Option Name" />
      <input type="number" value="${option.price}" placeholder="Option Price" />
    </li>
  `).join("");

  return `
    <form>
      <input type="text" value="${destination.name}" placeholder="Destination Name" />
      <textarea>${destination.description}</textarea>
      <input type="text" value="${destination.city}" placeholder="City" />
      <img src="${destination.photos[0]}" alt="Destination Photo" />
      <ul>${optionsHtml}</ul>
      <button type="submit">Save</button>
    </form>
  `;
}

export default class EditFormView extends AbstractView {
  #routePoint = null;

  constructor(routePoint) {
    super();
    this.#routePoint = routePoint;
  }

  get template() {
    return createEventEditorTemplate(this.#routePoint);
  }
}
