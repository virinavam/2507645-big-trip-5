import {
  EVENT_TYPES,
  MAX_PRICE_VALUE,
  CITIES
} from '../const.js';

import {
  getRandomArrayElement,
  getRandomPositiveNumber,
} from '../utils.js';

const mockEventPoints = [{
  basePrice: getRandomPositiveNumber(MAX_PRICE_VALUE),
  dateFrom: '2023-07-10T22:55:56.845Z',
  dateTo: '2023-07-11T11:22:13.375Z',
  destination: getRandomPositiveNumber(CITIES.length).toString(),
  isFavorite: false,
  offers: ['1', '2'],
  type: getRandomArrayElement(EVENT_TYPES)
}, {
  basePrice: getRandomPositiveNumber(MAX_PRICE_VALUE),
  dateFrom: '2023-08-03T23:20:56.845Z',
  dateTo: '2023-08-04T00:50:13.375Z',
  destination: getRandomPositiveNumber(CITIES.length).toString(),
  isFavorite: true,
  offers: ['1'],
  type: getRandomArrayElement(EVENT_TYPES)
}, {
  basePrice: getRandomPositiveNumber(MAX_PRICE_VALUE),
  dateFrom: '2023-08-06T09:23:56.845Z',
  dateTo: '2023-08-08T10:42:13.375Z',
  destination: getRandomPositiveNumber(CITIES.length).toString(),
  isFavorite: false,
  offers: [],
  type: getRandomArrayElement(EVENT_TYPES)
}, {
  basePrice: getRandomPositiveNumber(MAX_PRICE_VALUE),
  dateFrom: '2023-09-10T10:55:56.845Z',
  dateTo: '2023-09-10T12:22:13.375Z',
  destination: getRandomPositiveNumber(CITIES.length).toString(),
  isFavorite: false,
  offers: ['1', '2'],
  type: getRandomArrayElement(EVENT_TYPES)
}, {
  basePrice: getRandomPositiveNumber(MAX_PRICE_VALUE),
  dateFrom: '2019-07-13T22:55:56.845Z',
  dateTo: '2019-07-14T11:22:13.375Z',
  destination: getRandomPositiveNumber(CITIES.length).toString(),
  isFavorite: false,
  offers: ['2'],
  type: getRandomArrayElement(EVENT_TYPES)
}];

const getRandomEventPoint = () => getRandomArrayElement(mockEventPoints);

export {
  getRandomEventPoint
};
