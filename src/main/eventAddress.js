import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const transformAddress = addressSet => addressSet.filter(val => val).join(', ');

const EventAddress = ({
  location,
  displayAddressShort,
}) => {
  if (!location) return '';

  const { name, address, state, country, postalCode, city } = location;

  if (name === 'Virtual Event') return name;

  const addressLine1 = address ? transformAddress([address.line1, address.line2, address.line3]) : '';
  const addressLine2 = transformAddress([city?.name, `${state?.stateCode} ${postalCode ?? ''}`]);
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