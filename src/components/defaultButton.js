import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 4,
  },
}))

/**
 * Extension of material ui Button component
 * To accept loading and icon
 * @param {bool} loading 
 * @param {any} icon
 * @param {string} color 'default' | 'inherit' | 'primary' | 'secondary'
 * @param {any} children
 */
const DefaultButton = ({
  loading,
  icon,
  color = 'secondary',
  children,
  ...other
}) => {
  const classes = useStyles();

  const startIcon = () => {
    if (loading) {
      return <CircularProgress size={24} color={color} />;
    }
    if (icon) {
      return icon;
    }
    return null;
  }

  return (
    <Button
      className={classes.root}
      color={color}
      startIcon={startIcon()}
      {...other}
    >
      {children}
    </Button>
  )
};

export default DefaultButton;
