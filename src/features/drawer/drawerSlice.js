import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  open: false,
  options: {
    anchor: 'right',
    width: 480,
    disableBackdropClick: false,
    disableEscapeKeyDown: false,
    onClose: null,
    header: null,
    children: null,
  },
};

export const DrawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.open = true;
      state.options = { ...initialState.options, ...action.payload };
    },
    closeDrawer: (state) => {
      state.open = false;
      state.options = initialState.options;
    },
  },
});

export const { openDrawer, closeDrawer } = DrawerSlice.actions;

export default DrawerSlice.reducer;
