import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { get, isEmpty, startCase } from 'lodash';
import formatSearchParams from 'helpers/format-search-params';

const apiKey = process.env.REACT_APP_TICKET_MASTER_API_KEY;

export const initialState = {
  list: [],
  status: 'idle',
  error: '',
  searchTitles: '',
  page: {
    size: 20,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  },
  searchParams: {
    keyword: '',
    countryCode: 'AU',
    city: '',
    stateCode: '',
    postalCode: '',
  }
};

const transformSearchParam = (params) => {
  const searchTitles = [];

  for (const [key, value] of Object.entries(params)) {
    if (!isEmpty(value) && key !== 'countryCode') {
      searchTitles.push({ key, label: `${startCase(key)}: ${value}`});
    }
  }
  return searchTitles;
}

export const fetchSuggestedEvents = createAsyncThunk(
  'search/fetchSuggestedEvents',
  async () => {
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/suggest?apikey=${apiKey}&local=*&countryCode=AU`);
    const data = await response.json();
    return data;
  }
);

export const fetchEvents = createAsyncThunk(
  'search/fetchEvents',
  async ({ pageNumber = 0, pageSize = 20, ...params }) => {
    const searchParams = formatSearchParams(params);
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&page=${pageNumber}&size=${pageSize}&sort=date,asc&locale=*${searchParams}`);
    const data = await response.json();
    return { ...data, params};
  }
);

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetEvent: state => state = initialState,
    resetEventList: (state) => {
      state.list = initialState.list;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, {
        payload
      }) => {
        state.status = 'idle';
        state.list.push(...get(payload, ['_embedded', 'events'], []));      
        state.page = payload.page;
        state.searchParams = payload.params;
        state.searchTitles = transformSearchParam(payload.params);
      })
      .addCase(fetchEvents.rejected, (state, {
        payload
      }) => {
        if (payload) state.error = payload.message;
        state.status = 'error';
      })
      .addCase(fetchSuggestedEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSuggestedEvents.fulfilled, (state, {
        payload
      }) => {
        state.status = 'idle';
        state.searchTitles = [{ key: 'suggested', label: 'Suggested' }];
        state.list.push(...get(payload, ['_embedded', 'events'], []));
      })
      .addCase(fetchSuggestedEvents.rejected, (state, {
        payload
      }) => {
        if (payload) state.error = payload.message;
        state.status = 'error';
      });
  },
});

export const { resetEvent, resetEventList } = SearchSlice.actions;

export const getCurrentStatus = state => state.search.status;

export const getSearchResults = state => state.search.list;

export const getSearchParams = state => state.search.searchParams;

export const getPageInfo = state => state.search.page;

export default SearchSlice.reducer;
