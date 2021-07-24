// Supported Country Codes
// https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#supported-country-codes
export const countryList = [{
    'code': 'AD',
    'label': 'Andorra'
},
{
    'code': 'AI',
    'label': 'Anguilla'
},
{
    'code': 'AR',
    'label': 'Argentina'
},
{
    'code': 'AU',
    'label': 'Australia',
    'suggested': true
},
{
    'code': 'AT',
    'label': 'Austria'
},
{
    'code': 'AZ',
    'label': 'Azerbaijan'
},
{
    'code': 'BS',
    'label': 'Bahamas'
},
{
    'code': 'BH',
    'label': 'Bahrain'
},
{
    'code': 'BB',
    'label': 'Barbados'
},
{
    'code': 'BE',
    'label': 'Belgium'
},
{
    'code': 'BM',
    'label': 'Bermuda'
},
{
    'code': 'BR',
    'label': 'Brazil'
},
{
    'code': 'BG',
    'label': 'Bulgaria'
},
{
    'code': 'CA',
    'label': 'Canada',
    'suggested': true
},
{
    'code': 'CL',
    'label': 'Chile'
},
{
    'code': 'CN',
    'label': 'China'
},
{
    'code': 'CO',
    'label': 'Colombia'
},
{
    'code': 'CR',
    'label': 'Costa Rica'
},
{
    'code': 'HR',
    'label': 'Croatia'
},
{
    'code': 'CY',
    'label': 'Cyprus'
},
{
    'code': 'CZ',
    'label': 'Czech Republic'
},
{
    'code': 'DK',
    'label': 'Denmark'
},
{
    'code': 'DO',
    'label': 'Dominican Republic'
},
{
    'code': 'EC',
    'label': 'Ecuador'
},
{
    'code': 'EE',
    'label': 'Estonia'
},
{
    'code': 'FO',
    'label': 'Faroe Islands'
},
{
    'code': 'FI',
    'label': 'Finland'
},
{
    'code': 'FR',
    'label': 'France',
    'suggested': true
},
{
    'code': 'GE',
    'label': 'Georgia'
},
{
    'code': 'DE',
    'label': 'Germany',
    'suggested': true
},
{
    'code': 'GH',
    'label': 'Ghana'
},
{
    'code': 'GI',
    'label': 'Gibraltar'
},
{
    'code': 'GB',
    'label': 'Great Britain'
},
{
    'code': 'GR',
    'label': 'Greece'
},
{
    'code': 'HK',
    'label': 'Hong Kong'
},
{
    'code': 'HU',
    'label': 'Hungary'
},
{
    'code': 'IS',
    'label': 'Iceland'
},
{
    'code': 'IN',
    'label': 'India'
},
{
    'code': 'IE',
    'label': 'Ireland'
},
{
    'code': 'IL',
    'label': 'Israel'
},
{
    'code': 'IT',
    'label': 'Italy'
},
{
    'code': 'JM',
    'label': 'Jamaica'
},
{
    'code': 'JP',
    'label': 'Japan',
    'suggested': true
},
{
    'code': 'KR',
    'label': 'Korea, Republic of'
},
{
    'code': 'LV',
    'label': 'Latvia'
},
{
    'code': 'LB',
    'label': 'Lebanon'
},
{
    'code': 'LT',
    'label': 'Lithuania'
},
{
    'code': 'LU',
    'label': 'Luxembourg'
},
{
    'code': 'MY',
    'label': 'Malaysia'
},
{
    'code': 'MT',
    'label': 'Malta'
},
{
    'code': 'MX',
    'label': 'Mexico'
},
{
    'code': 'MC',
    'label': 'Monaco'
},
{
    'code': 'ME',
    'label': 'Montenegro'
},
{
    'code': 'MA',
    'label': 'Morocco'
},
{
    'code': 'NL',
    'label': 'Netherlands'
},
{
    'code': 'AN',
    'label': 'Netherlands Antilles'
},
{
    'code': 'NZ',
    'label': 'New Zealand'
},
{
    'code': 'ND',
    'label': 'Northern Ireland'
},
{
    'code': 'NO',
    'label': 'Norway'
},
{
    'code': 'PE',
    'label': 'Peru'
},
{
    'code': 'PL',
    'label': 'Poland'
},
{
    'code': 'PT',
    'label': 'Portugal'
},
{
    'code': 'RO',
    'label': 'Romania'
},
{
    'code': 'RU',
    'label': 'Russian Federation'
},
{
    'code': 'LC',
    'label': 'Saint Lucia'
},
{
    'code': 'SA',
    'label': 'Saudi Arabia'
},
{
    'code': 'RS',
    'label': 'Serbia'
},
{
    'code': 'SG',
    'label': 'Singapore'
},
{
    'code': 'SK',
    'label': 'Slovakia'
},
{
    'code': 'SI',
    'label': 'Slovenia'
},
{
    'code': 'ZA',
    'label': 'South Africa'
},
{
    'code': 'ES',
    'label': 'Spain'
},
{
    'code': 'SE',
    'label': 'Sweden'
},
{
    'code': 'CH',
    'label': 'Switzerland'
},
{
    'code': 'TW',
    'label': 'Taiwan'
},
{
    'code': 'TH',
    'label': 'Thailand'
},
{
    'code': 'TT',
    'label': 'Trinidad and Tobago'
},
{
    'code': 'TR',
    'label': 'Turkey'
},
{
    'code': 'UA',
    'label': 'Ukraine'
},
{
  'code': 'US',
  'label': 'United States Of America',
  'suggested': true
},
{
    'code': 'AE',
    'label': 'United Arab Emirates'
},
{
    'code': 'UY',
    'label': 'Uruguay'
},
{
    'code': 'VE',
    'label': 'Venezuela'
}];

// https://gist.github.com/devhammed/c1366f1630c7b861db7321b87e18e915

/**
  * Returns the country's flag emoji based on the ISO code
  * (ISO 3166-1 alpha-2 and ⚠️ No support for IE 11).
  *
  * @param {String} isoCode - The country ISO code e.g NG, US etc.
  * @return {String}
*/
export function countryISOToFlagEmoji(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode
}
