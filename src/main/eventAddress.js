import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const transformAddress = addressSet => addressSet.filter(val => val).join(', ');

/**
 * Transform address object and out string
 * @param {object} location - event location object 
 * @param {bool} displayAddressShort - display address inline and without country name
 */
const EventAddress = ({
  location,
  displayAddressShort,
}) => {
  if (isEmpty(location)) return '';

  const { name, address, state, country, postalCode, city } = location;

  // Address for Virtual Event does not make much sense
  if (name === 'Virtual Event') return name;

  // combine address lines
  const addressLine1 = address ? transformAddress([address.line1, address.line2, address.line3]) : '';
  // combine city, state and postal code
  const addressLine2 = transformAddress([city?.name, `${state?.stateCode} ${postalCode ?? ''}`]);
  // country name
  const addressLine3 = country?.name;

  if (displayAddressShort) {
    return <span>{`${name ? `${name}, ` : ''}${addressLine1} ${addressLine2}`}</span>
  }

  return (
    <Box display="flex" flexDirection="column">
      {name && <span>{name}</span>}
      <span>{addressLine1}</span>
      <span>{addressLine2}</span>
      <span>{addressLine3}</span>
    </Box>
  )
};

EventAddress.propTypes = {
  // object map with event location response
  location: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      line3: PropTypes.string,
    }),
    state: PropTypes.shape({
      stateCode: PropTypes.string,
      name: PropTypes.string,
    }),
    country: PropTypes.shape({
      countryCode: PropTypes.string,
      name: PropTypes.string,
    }),
    city: PropTypes.shape({
      name: PropTypes.string,
    }),
    postalCode: PropTypes.string,
  }),
  displayAddressShort: PropTypes.bool,
};

export default EventAddress;