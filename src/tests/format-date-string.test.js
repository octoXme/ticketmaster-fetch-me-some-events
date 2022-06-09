import {
  formatDate,
  getDateInfo,
  getFormattedDate,
  isSameYear,
} from 'helpers/format-date-string';
import moment from 'moment';

describe('getDateInfo', () => {
  it('should handle day/month/year format', () => {
    expect(getDateInfo('08 01 1995', 'DD MM YYYY')).toEqual({
      year: '1995',
      month: 'Jan',
      day: '8',
    });
  });

  it('should handle month/day/year format', () => {
    expect(getDateInfo('06 23 2020', 'MM DD YYYY')).toEqual({
      year: '2020',
      month: 'Jun',
      day: '23',
    });
  });

  it('should handle year/month/day format without spacing', () => {
    expect(getDateInfo('20200822', 'YYYYMMDD')).toEqual({
      year: '2020',
      month: 'Aug',
      day: '22',
    });
  });

  it('should handle empty string is being passed', () => {
    expect(getDateInfo('')).toEqual('');
  });

  it('should return a empty string invalid date string is being passed', () => {
    expect(getDateInfo(20210112)).toEqual('');
  });
});

describe('getFormattedDate', () => {
  it('should handle default date format', () => {
    const dateString = '2020 06 23';
    const result = getFormattedDate(dateString);

    expect(result).toEqual('Tue, 23-Jun-20');
  });

  it('should handle different date format', () => {
    const dateString = '06 11 2020';
    const dateFormat = 'DD MM YYYY';
    const result = getFormattedDate(dateString, null, dateFormat);

    expect(result).toEqual('Fri, 06-Nov-20');
  });

  it('should handle different display date format', () => {
    const dateString = '06 11 2020';
    const dateFormat = 'DD MM YYYY';
    const displayFormat = 'YYYY-MM-DD';
    const result = getFormattedDate(
      dateString,
      null,
      dateFormat,
      displayFormat
    );

    expect(result).toEqual('2020-11-06');
  });

  it('should handle time string with default format', () => {
    const dateString = '2020 11 06';
    const timeString = '15:30:00';
    const dateFormat = 'YYYY MM DD hh:mm:ss';
    const displayFormat = 'YYYY-MM-DD h:mm a';

    const result = getFormattedDate(
      dateString,
      timeString,
      dateFormat,
      displayFormat
    );

    expect(result).toEqual('2020-11-06 3:30 pm');
  });

  it('should handle time string', () => {
    const dateString = '06 11 2020';
    const timeString = '15:30:00';
    const dateFormat = 'DD MM YYYY hh:mm:ss';
    const displayFormat = 'YYYY-MM-DD h:mm a';

    const result = getFormattedDate(
      dateString,
      timeString,
      dateFormat,
      displayFormat
    );

    expect(result).toEqual('2020-11-06 3:30 pm');
  });

  it('should handle full date string and time', () => {
    const dateString = '2022-06-18T00:30:00Z';
    const timeString = '17:00:00';
    const dateFormat = 'YYYY-MM-DD hh:mm:ss';
    const displayFormat = 'YYYY-MM-DD h:mm a';

    const result = getFormattedDate(
      dateString,
      timeString,
      dateFormat,
      displayFormat
    );

    expect(result).toEqual('2022-06-18 5:00 pm');
  });

  it('should handle invalid date string', () => {
    const dateString = 'I am a wrong date string';

    const result = getFormattedDate(dateString);
    expect(result).toEqual('');
  });
});

describe('formatDate', () => {
  it('should handle simple date string', () => {
    expect(formatDate('2021-11-12')).toEqual('Fri, 12-Nov-21');
  });

  it('should handle with passed format', () => {
    expect(formatDate('2021 11 12', 'YYYY MM DD', 'DD-MM-YYYY')).toEqual(
      '12-11-2021'
    );
  });

  it('should handle time only - 12 hours', () => {
    expect(formatDate('12:00:00', 'hh:mm:ss', 'hh:mm A')).toEqual('12:00 PM');
  });

  it('should handle time with different display format - 12 hours', () => {
    expect(formatDate('12:00:00', 'hh:mm:ss', 'hh:mm a')).toEqual('12:00 pm');
  });

  it('should handle 24 hours format', () => {
    expect(formatDate('24:00:00', 'hh:mm:ss', 'hh:mm a')).toEqual('12:00 am');
  });

  it('should handle day string without space', () => {
    expect(formatDate('20200908')).toEqual('Tue, 08-Sep-20');
  });

  it('should handle invalid day string', () => {
    expect(formatDate('08112020')).toEqual('');
  });
});

describe('isSameYear', () => {
  const thisYear = moment().year();
  it('should return false when its not the same year', () => {
    const dateString = '2020-03-15';
    const format = 'YYYY-MM-DD';
    const result = isSameYear(dateString, format);

    expect(result).toEqual(false);
  });

  it('should return true when it is a same year', () => {
    const dateString = `${thisYear}-02-22`;
    const format = 'YYYY-MM-DD';
    const result = isSameYear(dateString, format);

    expect(result).toEqual(true);
  });

  it('should return false if dayString is not valid', () => {
    const dateString = 'Something is wrong.';
    const format = 'YYYY-MM-DD';
    const result = isSameYear(dateString, format);

    expect(result).toEqual(false);
  });
});
