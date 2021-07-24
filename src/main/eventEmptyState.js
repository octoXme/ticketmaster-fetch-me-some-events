import React from 'react';
import { Container, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import EmptyState from 'components/emptyState';
import { ErrorIcon } from 'components/icons';

const useStyles = makeStyles(theme => ({
  icon: {
    animationDuration: '4s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    animationName: '$moving',
  },
  '@keyframes moving': {
    '0%': {
      transform: 'translateX(-24px)',
    },
    '50%': {
      transform: 'translateX(24px)',
    },
    '100%': {
      transform: 'translateX(-24px)',
    },
  },
}));

const EventEmptyState = () => {
  const classes = useStyles();
  const error = useSelector(state => state.search.error);

  return (
    <Container maxWidth="sm">
      <Paper component={Box} py={3}>
        <EmptyState
          icon={<ErrorIcon fontSize="large" className={classes.icon} color="error" />}
          title="Sorry, something went wrong."
          subtitle={error ?? '...'}
        />
      </Paper>
    </Container>
  )
};

export default EventEmptyState;
