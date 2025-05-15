import dayjs from 'dayjs';
import {FilterType} from '../const';

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
