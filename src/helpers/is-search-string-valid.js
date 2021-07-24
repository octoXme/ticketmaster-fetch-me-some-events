import { size, trim, isString } from 'lodash';

export default function isSearchStringValid(searchString, length = 1, maxLength = 150) {
  if (!isString(searchString)) return false;
  const inputLength = size(trim(searchString));

  if (maxLength !== undefined) {
    return inputLength >= length && inputLength <= maxLength;
  }

  return inputLength >= length;
}
