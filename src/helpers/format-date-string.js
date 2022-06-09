import { isString } from 'lodash';
import moment from 'moment';

export const DefaultDateFormat = 'YYYY-MM-DD';
export const DefaultDateTimeFormat = 'YYYY-MM-DD hh:mm:00';
export const DefaultDisplayFormat = 'ddd, DD-MMM-YY';
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
export const getDateInfo = (dateString, dateFormat = DefaultDateFormat) => {
  if (!dateString || !isString(dateString)) return '';
  const date = moment(dateString, dateFormat);
  // check if date is valid
  if (!date.isValid()) return '';
  const year = date.format('YYYY');
  const month = date.format('MMM');
  const day = date.format('D');
  return { year, month, day };
};

/**
 * Format Date or DateTime string into defined format
 * @param {string} dateString
 * @param {string} dateFormat
 * @param {string} displayFormat
 * @param {string} timeString
 * @returns string
 */
export const getFormattedDate = (
  dateString,
  timeString,
  dateFormat = DefaultDateFormat,
  displayFormat = DefaultDisplayFormat
) => {
  if (timeString) {
    const dateTimeString = dateString + ' ' + timeString;

    return formatDate(dateTimeString, dateFormat, displayFormat);
  }

  return formatDate(dateString, dateFormat, displayFormat);
};

/**
 * Output string with provided params into desire format
 * @param {string} dateString
 * @param {string} dateFormat
 * @param {string} displayFormat
 * @returns string
 */
export const formatDate = (
  dateString,
  dateFormat = DefaultDateFormat,
  displayFormat = DefaultDisplayFormat
) => {
  if (!dateString || !isString(dateString)) return '';

  const newDate = moment(dateString, dateFormat);

  if (!newDate.isValid()) return '';

  return newDate.format(displayFormat);
};

/**
 *
 * @param {string} dateString
 * @param {string} format
 * @returns boolean
 */
export const isSameYear = (dateString, format = DefaultDateFormat) => {
  const date = moment(dateString, format);

  if (!date.isValid()) {
    return false;
  }

  return date.isSame(moment(), 'year');
};
