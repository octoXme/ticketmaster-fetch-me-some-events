import { getDateInfo, getFormattedDate, formatDate } from 'helpers/format-date-string';

it('return date (year, month, day) object or empty string if invalid for given date string', () => {
  expect(getDateInfo('08 01 1995', 'DD MM YYYY')).toEqual({ year: '1995', month: 'Jan', day: '8'});
  expect(getDateInfo('06 23 2020', 'MM DD YYYY')).toEqual({ year: '2020', month: 'Jun', day: '23'});
  expect(getDateInfo('20200822', 'YYYYMMDD')).toEqual({ year: '2020', month: 'Aug', day: '22'});
  expect(getDateInfo('')).toEqual('');
  expect(getDateInfo(20210112)).toEqual('');
 });

 it('return formatted date time for given date and strings', () => {
  expect(getFormattedDate('2022-07-29T12:00:00Z', '20:00:00')).toEqual('Fri, 29-Jul-22 8:00 pm');
  expect(getFormattedDate('06 23 2020', '04:00')).toEqual('');
  expect(getFormattedDate('06 23 2020', '04:00', 'MM DD YYYY', 'hh:mm')).toEqual('Tue, 23-Jun-20 4:00 am');
  expect(getFormattedDate('06 23 2020', '04:00', 'MM DD YYYY', 'hh:mm', 'YYYY-MM-DD hh:mm:ss')).toEqual('2020-06-23 04:00:00');
  expect(getFormattedDate('2021-12-11', '10:00:00')).toEqual('Sat, 10:00');
 });

 it('return formatted date with for given date and strings', () => {
  expect(formatDate('2021-11-12')).toEqual('Friday, November 12th 2021');
  expect(formatDate('2021 11 12', 'YYYY MM DD', 'DD-MM-YYYY')).toEqual('12-11-2021');
  expect(formatDate('12:00:00', 'hh:mm:ss', 'hh:mm A')).toEqual('12:00 PM');
  expect(formatDate('12:00:00', 'hh:mm:ss', 'hh:mm a')).toEqual('12:00 pm');
  expect(formatDate('24:00:00', 'hh:mm:ss', 'hh:mm a')).toEqual('12:00 am');
  expect(formatDate('20200908')).toEqual('Tuesday, September 8th 2020');
  expect(formatDate('08112020')).toEqual('');
  expect(formatDate('08112020', 'DDMMYYYY')).toEqual('Sunday, November 8th 2020');
 });