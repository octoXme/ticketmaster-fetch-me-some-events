import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BeeIcon } from 'components/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
    minHeight: 128,
  },
  dot: {
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    animationName: '$jumpy',
  },
  '@keyframes jumpy': {
    '50%': {
      transform: 'translateY(8px)',
    },
  },
}));

const LoadingState = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <div className={classes.dot}><BeeIcon fontSize="large" /></div>
        <div className={classes.dot} style={{ animationDelay: '.25s' }}><BeeIcon fontSize="medium" /></div>
        <div className={classes.dot} style={{ animationDelay: '.5s' }}><BeeIcon fontSize="small" /></div>
      </div>
    </Container>
  )
};

export default LoadingState;
