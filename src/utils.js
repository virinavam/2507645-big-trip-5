import {sortPointDay, sortPointTime, sortPointPrice} from './point';
import dayjs from 'dayjs';
import {SortTypes} from '../const';
import {FilterType} from "./const";

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

const filterByPast = (date) => dayjs().isAfter(dayjs(date), 'day');
const filterByFuture = (date) => dayjs(date).isAfter(dayjs(), 'day');

export const filterByType = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => filterByFuture(point.startDate)),
  [FilterType.PAST]: (points) => points.filter((point) => filterByPast(point.endDate)),
  [FilterType.PRESENT]: (points) => points.filter((point) => {
    const currentDate = dayjs().startOf('day');
    const startDate = dayjs(point.startDate).startOf('day');
    const endDate = dayjs(point.endDate).startOf('day');
    return startDate.isSame(currentDate) || (startDate.isBefore(currentDate) && endDate.isAfter(currentDate));
  })
};

export const humanizePointDate = (date, form) => dayjs(date).format(form);

const createDuration = (startDate, endDate, param) => dayjs(humanizePointDate(endDate, 'YYYY-MM-DDTHH:mm')).diff(humanizePointDate(startDate, 'YYYY-MM-DDTHH:mm'), param);

const formattingDate = (diffDate) => diffDate < 10 ? `0${diffDate}` : `${diffDate}`;

export const calculateDuration = (startDate, endDate) => {
  const differenceDays = formattingDate(createDuration(startDate, endDate, 'day'));
  const differenceHours = formattingDate(createDuration(startDate, endDate, 'hour') - differenceDays * 24);
  const differenceMinutes = formattingDate(createDuration(startDate, endDate, 'minute') - differenceDays * 24 * 60 - differenceHours * 60);
  if (startDate === null || endDate === null){
    return null;
  }
  if (differenceDays !== '00') {
    return `${differenceDays}D ${differenceHours}H ${differenceMinutes}M`;
  }

  if (differenceHours !== '00') {
    return `${differenceHours}H ${differenceMinutes}M`;
  }
  return `${differenceMinutes}M`;
};

export const sortPointTime = (pointA, pointB) => dayjs(pointB.endDate).diff(dayjs(pointB.startDate)) - dayjs(pointA.endDate).diff(dayjs(pointA.startDate));

export const sortPointDay = (pointA, pointB) => {
  const dateFromDifference = dayjs(pointA.startDate).diff(dayjs(pointB.startDate));
  return dateFromDifference === 0 ? dayjs(pointB.endDate).diff(dayjs(pointA.endDate)) : dateFromDifference;
};

export const sortPointPrice = (pointA, pointB) => pointB.price - pointA.price;
