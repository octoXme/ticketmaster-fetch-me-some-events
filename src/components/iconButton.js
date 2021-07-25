import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';

/**
 * Extension of material ui IconButton component
 * Add Tooltip by default
 * @param {string} title - explanation of the usage of the button 
 * @param {any} icon
 */
const IconButtonComponent = ({
  title,
  icon,
  ...other
}) => (
  <Tooltip title={title}>
    <IconButton aria-label={title} {...other}>{icon}</IconButton>
  </Tooltip>
);

export default IconButtonComponent;
