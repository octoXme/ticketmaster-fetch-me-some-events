import formatSearchParams from 'helpers/format-search-params';

describe('formatSearchParams', () => {
  it('should handle format correctly', () => {
    const searchParams = {
      keyword: '', // should not render
      countryCode: 'AU',
      city: '', // should not render
      stateCode: false, // should not render
      postalCode: '7001',
    };
    expect(formatSearchParams(searchParams)).toEqual(
      '&countryCode=AU&postalCode=7001'
    );
  });

  it('should handle invalid postal code', () => {
    const searchParams = {
      keyword: 'sandy',
      countryCode: 'AU',
      city: 'hobart',
      stateCode: '', // should not render
      postalCode: 70001, // should not render
    };

    expect(formatSearchParams(searchParams)).toEqual(
      '&keyword=sandy&countryCode=AU&city=hobart'
    );
  });

  it('should handle empty object', () => {
    expect(formatSearchParams({})).toEqual('');
  });
});
