import React from 'react';
import { Container, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import EmptyState from 'components/emptyState';
import { ErrorIcon } from 'components/icons';

const useStyles = makeStyles(theme => ({
  icon: {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    animationName: '$flying',
  },
  '@keyframes flying': {
    '0%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(12px)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
}));

/**
 * Simple component that shows app is in error state
 * Unfortunately, there is no response payload comes back - undefined
 */
const EventErrorState = () => {
  const classes = useStyles();
  const error = useSelector(state => state.search.error);

  return (
    <Container maxWidth="sm">
      <Paper component={Box} py={3}>
        <EmptyState
          icon={<ErrorIcon fontSize="large"  className={classes.icon} color="error" />}
          title="Sorry, something went wrong."
          subtitle={error ?? '...'}
        />
      </Paper>
    </Container>
  )
};

export default EventErrorState;
