import moment from 'moment';

const sortDateFormat = 'ddd, HH:mm';
const longDateFormat = 'ddd, DD-MMM-YY h:mm a';

export const getDateInfo = (dateString) => {
  if (!dateString) return '';

  const date = moment(moment(dateString), 'YYYY/MM/DD');
  const year = date.format('YYYY');
  const month = date.format('MMM');
  const day   = date.format('D');
  return ({ year, month, day });
};

export const getFormattedDate = (dateString, timeString = '') => {
  let newDate = dateString;
  let format = longDateFormat;

  if (timeString) {
    newDate = dateString + ' ' + timeString;
  }

  if (!newDate) return '';

  // convert new date string to moment date
  newDate = moment(newDate);

  const isSameYear = newDate.isSame(moment(), 'year');

  if (isSameYear) {
    format = sortDateFormat;
  }
  
  return newDate.format(format);
};

export const formatDate = (dateString, format) => {
  if (!dateString) return '';

  return moment(dateString).format(format);
}