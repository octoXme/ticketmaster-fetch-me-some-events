import React from 'react';
import { Typography, IconButton, Box } from '@material-ui/core';

/**
 * Define basic layout of empty state
 * @param {func} onClick - optional 
 * @param {any} icon - optional
 * @param {string} title
 * @param {string} subtitle
 * @param {any} content
 */
const EmptyState = ({
  onClick,
  icon,
  subtitle,
  title,
  content,
}) => (
  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
    {icon
      && (
        <Box my={1}>
          <IconButton onClick={onClick} disabled={!onClick}>
            {icon}
          </IconButton>
        </Box>
      )}
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {title && <Typography color="textSecondary" variant="h6">{title}</Typography>}
      {subtitle && <Typography color="textSecondary" variant="caption">{subtitle}</Typography>}
      {content && content}
    </Box>
  </Box>
);

export default EmptyState;
