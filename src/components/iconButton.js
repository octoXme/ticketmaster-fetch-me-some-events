import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';

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
