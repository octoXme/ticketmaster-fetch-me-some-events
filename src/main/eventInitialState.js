import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Divider } from '@material-ui/core';
import { SearchIcon, SuggestionIcon } from 'components/icons';
import EmptyState from 'components/emptyState';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  divider: {
    width: '100%',
    height: 1,
    margin: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      height: 72,
      width: 1,
    },
  },
  block: {
    flex: 1,
  },
}));

const EventInitialState = ({
  onClickSearch,
  onClickShowSuggestion,
}) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Paper>
        <div className={classes.root}>
          <div className={classes.block}>
            <EmptyState
            icon={<SearchIcon fontSize="large" />}
            title="Search"
            subtitle="Music, Gig, Sports, Arts..."
            onClick={onClickSearch}
            />
          </div>
          <Divider className={classes.divider} />
          <div className={classes.block}>
            <EmptyState
              icon={<SuggestionIcon fontSize="large" color="secondary" />}
              title="Suggestions"
              subtitle="Somewhat randomly..."
              onClick={onClickShowSuggestion}
              className={classes.block}
            />
          </div>
        </div>
      </Paper>
    </Container>
  )
};

export default EventInitialState;
