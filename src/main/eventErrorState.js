import React from 'react';
import { Container, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmptyState from 'components/emptyState';
import { BeeIcon } from 'components/icons';

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

const EventErrorState = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Paper component={Box} py={3}>
        <EmptyState
          icon={<BeeIcon fontSize="large"  className={classes.icon}/>}
          title="Can’t find any events."
          subtitle="Clear your filters and try again"
        />
      </Paper>
    </Container>
  )
};

export default EventErrorState;
