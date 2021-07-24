import React, { useState } from 'react';
import { isEmpty, map, debounce } from 'lodash';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import EventCard from 'main/eventCard';
import PanelContent from 'components/panelContent';
import { fetchEvents, getCurrentStatus, getSearchResults, getPageInfo, getSearchParams, fetchSuggestedEvents } from 'features/search/searchSlice';
import InfiniteLoadingList from 'components/infiniteLoadingList';
import { openDialog } from 'features/dialog/dialogSlice';
import EventInitialState from 'main/eventInitialState';
import EventEmptyState from 'main/eventEmptyState';
import EventDetails from './eventDetails';
import EventErrorState from './eventErrorState';

const EventLists = ({ initialState, onUploadInitialState, onSearchInputFocus }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const currentState = useSelector(getCurrentStatus);
  const events = useSelector(getSearchResults);
  const pageInfo = useSelector(getPageInfo);
  const currentSearchParams = useSelector(getSearchParams);
  const itemsPerRow = useMediaQuery(theme.breakpoints.up('lg')) ? 3 : 2;
  const [currentLoading, setCurrentLoading] = useState(null);

  const showSuggestions = () => {
    dispatch(fetchSuggestedEvents());
    onUploadInitialState(false);
  }

  const handleLoadMore = debounce((params) => {
    dispatch(fetchEvents({ ...currentSearchParams, pageNumber: pageInfo.number + 1 }))
  }, 300);


  const eventLoaded = (event) => {
    dispatch(openDialog({
      children: (<EventDetails event={event} />)
    }));
    setTimeout(() => {
      setCurrentLoading(null);
    }, 300);
  };

  let content = () => {
    if (initialState) {
      return (
        <EventInitialState
          onClickSearch={onSearchInputFocus}
          onClickShowSuggestion={showSuggestions}
        />
      );
    }
  
    if (currentState === 'idle' && isEmpty(events)) {
      return <EventEmptyState />;
    }

    if (currentState === 'error') {
      return <EventErrorState />;
    }

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
      hasMore={pageInfo.totalPages > pageInfo.number + 1}
    >
      {content()}
    </InfiniteLoadingList>
  );
};

export default EventLists;
