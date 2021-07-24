import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  open: false,
  options: {
    children: null,
    maxWidth: 'sm',
  },
};

export const DialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.open = true;
      state.options = { ...initialState.options, ...action.payload };
    },
    closeDialog: (state) => {
      state.open = false;
      state.options = initialState.options;
    },
  },
});

export const { openDialog, closeDialog, resetDialog } = DialogSlice.actions;

export default DialogSlice.reducer;
