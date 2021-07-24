import searchReducer, { initialState, fetchEvents } from './searchSlice';

describe('search reducer', () => {
  it('set state to loading when fetchEvent is pending', () => {
    const action = { type: fetchEvents.pending };
    const state = searchReducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: 'loading', error: null });
  });

  it('set state to error when fetchEvent is rejected', () => {
    const action = { type: fetchEvents.rejected };
    const state = searchReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: 'error',
    });
  });
});
