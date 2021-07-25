import moment from 'moment';
import { isString } from 'lodash';

export const PreferredShortDateTimeFormat = 'ddd, HH:mm';
export const PreferredLongDateTimeFormat = 'ddd, DD-MMM-YY h:mm a';
export const PreferredLongDateFormat = 'dddd, MMMM Do YYYY';

/**
 * Extract the year, month, day for the given date string
 * If dateString is 08072021, dateFormat must be pass in - in order for the output display correctly
 * i.e. getDateInfo('08072021', 'DDMMYYYY')
 * @param {string} dateString
 * @param {string} dateFormat - format of the passing date string
 * @returns empty string or object contains year, month day
 */
export const getDateInfo = (dateString, dateFormat = 'YYYY-MM-DD') => {
  if (!dateString || !isString(dateString)) return '';
  const date = moment(dateString, dateFormat);
  // check if date is valid
  if (!date.isValid()) return '';
  const year = date.format('YYYY');
  const month = date.format('MMM');
  const day   = date.format('D');
  return ({ year, month, day });
};

/**
 * Format Date or DateTime string into defined format
 * @param {string} dateString 
 * @param {string} timeString 
 * @param {string} dateFormat 
 * @param {string} timeFormat 
 * @param {string} displayFormat 
 */
export const getFormattedDate = (
  dateString,
  timeString = '',
  dateFormat = 'YYYY-MM-DD',
  timeFormat = 'hh:mm:ss',
  displayFormat = PreferredLongDateTimeFormat,
  ) => {
  if (!isString(dateString) || !isString(timeString)) return '';

  let newDate = null;
  let format = displayFormat; // display format
  
  newDate = moment(dateString, dateFormat);

  if (timeString) {
    newDate = moment(dateString + ' ' + timeString, dateFormat + ' ' + timeFormat);
  }

  if (!newDate.isValid()) return '';

  const isSameYear = newDate.isSame(moment(), 'year');

  if (isSameYear) {
    format = PreferredShortDateTimeFormat;
  }
  
  return newDate.format(format);
};

/**
 * Output string with provided params into desire format
 * @param {string} dateString 
 * @param {string} dateFormat 
 * @param {string} displayFormat 
 * @returns 
 */
export const formatDate = (dateString, dateFormat = 'YYYY-MM-DD', displayFormat = PreferredLongDateFormat) => {
  if (!dateString || !isString(dateString)) return '';

  const newDate = moment(dateString, dateFormat);
  
  if (!newDate.isValid()) return ''

  return newDate.format(displayFormat);
}
