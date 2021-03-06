import { isEmpty, isString, mapKeys } from 'lodash';

// only consider string params
const validValue = value => !isEmpty(value) && isString(value);

/**
 * Transform object (multiple parameters) into string that pass to API
 * @param {object} params 
 * @returns 
 */
const formatSearchParams = (params) => {
  let url = '';
  if (isEmpty(params)) return '';

  mapKeys(params, (value, key) => {
    if (validValue(value)) {
      url += `&${key}=${encodeURIComponent(value)}`;
    }
  });

  return url;
};

export default formatSearchParams;
