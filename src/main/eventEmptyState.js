import React from 'react';
import { Container, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import EmptyState from 'components/emptyState';
import { BeeIcon } from 'components/icons';

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

/**
 * Simple component that shows app is in empty state
 */
const EventEmptyState = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Paper component={Box} py={3}>
        <EmptyState
          icon={<BeeIcon fontSize="large" className={classes.icon}  />}
          title="Can’t find any events."
          subtitle="Clear your filters and try again"
        />
      </Paper>
    </Container>
  )
};

export default EventEmptyState;
