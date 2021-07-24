import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 4,
  },
  prefix: {
    width: 32,
    display: 'flex',
    alignItems: 'center',
  },
}))

const DefaultButton = ({
  loading,
  icon,
  color = 'secondary',
  children,
  ...other
}) => {
  const classes = useStyles();

  return (
    <Button className={classes.root} color={color} {...other}>
      {loading && <div className={classes.prefix}><CircularProgress size={24} color={color} /></div>}
      {icon && <div className={classes.prefix}>{icon}</div>}
      {children}
    </Button>
  )
};

export default DefaultButton;
