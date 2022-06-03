import moment from 'moment';

export const getFullDate = (time: string) =>
  moment(time).format('DD.MM.YYYY HH:mm') || 'Incorrect date';
