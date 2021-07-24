import {configureStore} from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import drawerReducer from '../features/drawer/drawerSlice';
import dialogReducer from '../features/dialog/dialogSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    drawer: drawerReducer,
    dialog: dialogReducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
