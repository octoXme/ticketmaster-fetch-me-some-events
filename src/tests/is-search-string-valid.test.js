import isSearchStringValid from 'helpers/is-search-string-valid';

describe('isSearchStringValid', () => {
  it('should return true with default params', () => {
    expect(isSearchStringValid('sandy')).toEqual(true);
  });

  it('should return false if pass false', () => {
    expect(isSearchStringValid(false)).toEqual(false);
  });

  it('should return false when pass null', () => {
    expect(isSearchStringValid(false)).toEqual(false);
  });

  it('should return false when string is less than min length', () => {
    expect(isSearchStringValid('sam', 4)).toEqual(false);
  });

  it('should return false when string is grater than max length', () => {
    const string = 'I am longer than the max length that have been defined';
    expect(isSearchStringValid(string, 4, 10)).toEqual(false);
  });
});
