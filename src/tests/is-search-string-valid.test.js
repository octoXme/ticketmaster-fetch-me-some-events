import isSearchStringValid from 'helpers/is-search-string-valid';

it('search string should be valid by the given min and max range', () => {
  expect(isSearchStringValid('sandy')).toEqual(true);
  expect(isSearchStringValid('sam', 4)).toEqual(false);
  expect(isSearchStringValid(false)).toEqual(false);
  expect(isSearchStringValid(null)).toEqual(false);
 });
 