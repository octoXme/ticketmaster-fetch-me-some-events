import { size, trim, isString } from 'lodash';

/**
 * Check if string is fullfil the min and max conditions
 * @param {string} searchString 
 * @param {number} length 
 * @param {number} maxLength 
 * @returns 
 */
export default function isSearchStringValid(searchString, length = 1, maxLength = 150) {
  if (!isString(searchString)) return false;
  const inputLength = size(trim(searchString));

  if (maxLength !== undefined) {
    return inputLength >= length && inputLength <= maxLength;
  }

  return inputLength >= length;
}
