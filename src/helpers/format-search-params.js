import { isEmpty, mapKeys, map, isArray, isString, isBoolean } from 'lodash';

const validValue = value => !isEmpty(value) || value === true || value === false;

const formatSearchParams = (params) => {
  let url = '';
  if (!isEmpty(params)) {
    mapKeys(params, (value, key) => {
      if (validValue(value)) {
        if (isString(value) || isBoolean(value)) {
          url += `&${key}=${encodeURIComponent(value)}`;
        } else if (isArray(value)) {
          map(value, (x) => {
            if (validValue(x)) {
              url += `&${key}=${encodeURIComponent(x)}`;
            }
          });
        } else {
          formatSearchParams(value);
        }
      }
    });
  }
  return url;
};

export default formatSearchParams;
