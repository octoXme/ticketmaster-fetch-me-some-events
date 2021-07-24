import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Chip, Toolbar, CircularProgress } from '@material-ui/core';
import { map, isEmpty } from 'lodash';
import { fetchEvents, getSearchParams, getSelectStatus, resetEventList } from 'features/search/searchSlice';
import { CloseIcon } from 'components/icons';

const EventSearchTags = () => {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(null);
  const currentSearchParams = useSelector(getSearchParams);
  const currentSearchTitles = useSelector(state => state.search.searchTitles);
  const currentState = useSelector(getSelectStatus);

  if (isEmpty(currentSearchTitles)) return false;

  const removeSearchTag = (param) => {
    setDeleting(param);
    dispatch(resetEventList())
    dispatch(fetchEvents({ ...currentSearchParams, [param]: '' })).finally(() => setDeleting(null));
  }

  return (
    <Toolbar className="flex-row-container with-gutter" variant="dense">
      {currentState === 'loading'
        ? <CircularProgress size={20} />
        : (map(currentSearchTitles, (x) => {
          const deleteProps = x.key === 'suggested' ? {} : {
            onDelete: () => removeSearchTag(x.key),
          };

          return (
            <Chip
              key={x.key}
              label={x.label}
              deleteIcon={deleting === x.key ? <CircularProgress size={20} /> : <CloseIcon />}
              {...deleteProps}
            />
          )}
        )
      )}
    </Toolbar>
  );
};

export default EventSearchTags;
