import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Chip, CircularProgress, Box } from '@material-ui/core';
import { map, isEmpty } from 'lodash';
import { fetchEvents, getSearchParams } from 'features/search/searchSlice';
import { CloseIcon } from 'components/icons';

/**
 * Display sets of current search tags (except country)
 * This provides a quick way to remove search filter without the need to open the drawer
 * Note that 'suggested' is calling different api (/suggest), so exclude from calling event api
 */
const EventSearchTags = () => {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(null);
  const currentSearchParams = useSelector(getSearchParams);
  const currentSearchTitles = useSelector(state => state.search.searchTitles);

  if (isEmpty(currentSearchTitles)) return false;

  const removeSearchTag = (param) => {
    setDeleting(param);
    dispatch(fetchEvents({ ...currentSearchParams, [param]: '' })).finally(() => setDeleting(null));
  }

  return (
    <Box className="flex-row-container with-gutter" mt={2} mx={2}>
      {map(currentSearchTitles, (x) => {
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
      )}
    </Box>
  );
};

export default EventSearchTags;
