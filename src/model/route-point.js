export class Option {
  constructor({type, name, price}) {
    this.type = type;
    this.name = name;
    this.price = price;
  }
}

export class Destination {
  constructor({name, description, city, photos}) {
    this.name = name;
    this.description = description;
    this.city = city;
    this.photos = photos;
  }
}

export class RoutePoint {
  constructor({type, destination, options}) {
    this.type = type;
    this.destination = destination;
    this.options = options;
  }
}
