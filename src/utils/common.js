import {sortPointDay, sortPointTime, sortPointPrice} from './point';
import dayjs from 'dayjs';
import {SortTypes} from '../const';

export const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);

export const sortPointsByType = {
  [SortTypes.DEFAULT]: (points) => points.sort(sortPointDay),
  [SortTypes.TIME]: (points) => points.sort(sortPointTime),
  [SortTypes.PRICE]: (points) => points.sort(sortPointPrice)
};

export const getStartPoint = (points) => {
  let startPoint = points[0];
  for(let i = 1; i < points.length; i++) {
    const currentPointDate = points[i].startDate;
    const endPointDate = startPoint.startDate;
    if(dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') < 0
      || dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') === 0
      && dayjs(currentPointDate).diff(dayjs(endPointDate), 'D') < 0) {
      startPoint = points[i];
    }
  }
  return startPoint;
};

export const getEndPoint = (points) => {
  let endPoint = points[0];
  for(let i = 1; i < points.length; i++) {
    const currentPointDate = points[i].endDate;
    const endPointDate = endPoint.endDate;
    if(dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') > 0
      || dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') === 0
      && dayjs(currentPointDate).diff(dayjs(endPointDate), 'D') > 0) {
      endPoint = points[i];
    }
  }
  return endPoint;
};

