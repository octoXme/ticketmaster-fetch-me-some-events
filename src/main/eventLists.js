import React, { useState } from 'react';
import { isEmpty, map } from 'lodash';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import EventCard from 'main/eventCard';
import PanelContent from 'components/panelContent';
import { fetchEvents, updateInitialLoadingState, getSelectStatus, getSearchResults, getPageInfo, getSearchParams, fetchSuggestedEvents } from 'features/search/searchSlice';
import LoadingState from 'components/loadingState';
import InfiniteLoadingList from 'components/infiniteLoadingList';
import { openDialog } from 'features/dialog/dialogSlice';
import EventInitialState from 'main/eventInitialState';
import EventEmptyState from 'main/eventEmptyState';
import EventDetails from './eventDetails';

const EventLists = ({ initialState, onUploadInitialState, onSearchInputFocus }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const currentState = useSelector(getSelectStatus);
  const events = useSelector(getSearchResults);
  const pageInfo = useSelector(getPageInfo);
  const currentSearchParams = useSelector(getSearchParams);
  const isInitialLoading = useSelector(state => state.search.initialLoading === true);
  const itemsPerRow = useMediaQuery(theme.breakpoints.up('lg')) ? 3 : 2;
  const [currentLoading, setCurrentLoading] = useState(null);

  const showSuggestions = () => {
    dispatch(fetchSuggestedEvents());
    onUploadInitialState(false);
  }

  const handleLoadMore = () => {
    if (isInitialLoading) {
      dispatch(updateInitialLoadingState(false));
    }
    dispatch(fetchEvents({ ...currentSearchParams, pageNumber: pageInfo.number + 1 }))
  }

  let content = () => {
    if (initialState) {
      return (
        <EventInitialState
          onClickSearch={onSearchInputFocus}
          onClickShowSuggestion={showSuggestions}
        />
      );
    }

    if (isInitialLoading) {
      return <LoadingState />
    }
  
    if (currentState !== 'loading' && isEmpty(events)) {
      return <EventEmptyState />
    }
    
    const eventLoaded = (event) => {
      dispatch(openDialog({
        children: (<EventDetails event={event} />)
      }));
      setTimeout(() => {
        setCurrentLoading(null);
      }, 300);
    };

    return (
      <PanelContent itemsPerRow={itemsPerRow}>
        {map(events, event => (
          <EventCard
            key={event.id}
            event={event}
            loading={currentLoading === event.id}
            onClick={() => setCurrentLoading(event.id)}
            onEventLoaded={() => eventLoaded(event)}
          />
        ))}
      </PanelContent>
    );
  };

  return (
    <InfiniteLoadingList
      hasChildren={!isEmpty(events)}
      dataLength={events.length}
      loadFunction={handleLoadMore}
      hasMore={pageInfo.totalPages > pageInfo.number}
    >
      {content()}
    </InfiniteLoadingList>
  );
};

export default EventLists;
