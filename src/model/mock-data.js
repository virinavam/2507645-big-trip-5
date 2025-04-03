import {getRandomTask} from '../mock/mock.js'; // Это пример. Подключите необходимые моковые данные.

export function generateMockData() {
  // Генерация случайных данных
  return new RoutePoint({
    type: 'Visit',
    destination: new Destination({
      name: 'Eiffel Tower',
      description: 'Lorem ipsum dolor sit amet...',
      city: 'Paris',
      photos: ['https://loremflickr.com/248/152?random=1']
    }),
    options: [new Option({type: 'Hotel', name: 'Luxury Stay', price: 100})],
  });
}
