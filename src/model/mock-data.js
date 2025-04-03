import { RoutePoint } from '../model/route-point.js';
import { Destination } from '../model/destination.js';
import { Option } from '../model/option.js';

export function generateMockData() {
  return new RoutePoint({
    type: 'Visit',
    destination: new Destination({
      name: 'Eiffel Tower',
      description: 'Lorem ipsum dolor sit amet...',
      city: 'Paris',
      photos: ['https://loremflickr.com/248/152?random=1']
    }),
    options: [new Option({ type: 'Hotel', name: 'Luxury Stay', price: 100 })],
  });
}
