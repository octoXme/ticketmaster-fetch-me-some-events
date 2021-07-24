import { size, trim } from 'lodash';

export default function isSearchStringValid(searchString, length = 1, maxLength = 150) {
  const inputLength = size(trim(searchString));

  if (maxLength !== undefined) {
    return inputLength >= length && inputLength <= maxLength;
  }

  return inputLength >= length;
}
