import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@material-ui/core';
import LoadingState from 'components/loadingState';

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'inherit !important',
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
}))

const InfiniteLoadingList = ({
  hasChildren,
  dataLength,
  hasMore,
  loadFunction,
  children,
}) => {
  const classes = useStyles();
  return (
    <InfiniteScroll
      className={classes.root}
      hasChildren={hasChildren}
      dataLength={dataLength}
      next={loadFunction}
      hasMore={hasMore}
      loader={<div className={classes.loader}><LoadingState /></div>}
    >
      {children}
    </InfiniteScroll>
  )
}

export default InfiniteLoadingList;