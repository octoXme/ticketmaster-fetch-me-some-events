import formatSearchParams from 'helpers/format-search-params';

const searchParams1 = {
  keyword: '', // should not render
  countryCode: 'AU',
  city: '', // should not render
  stateCode: false, // should not render
  postalCode: '7001',
}

const searchParams2 = {
  keyword: 'sandy',
  countryCode: 'AU',
  city: 'hobart',
  stateCode: '', // should not render
  postalCode: 70001, // should not render
}

it('search params should format correctly before post to api', () => {
  expect(formatSearchParams(searchParams1)).toEqual('&countryCode=AU&postalCode=7001');
  expect(formatSearchParams(searchParams2)).toEqual('&keyword=sandy&countryCode=AU&city=hobart');
  expect(formatSearchParams({})).toEqual('');
 });