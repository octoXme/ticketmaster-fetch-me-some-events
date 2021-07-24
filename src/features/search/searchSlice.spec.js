import searchReducer, {initialState} from './searchSlice';

// TODO 
describe('search reducer', () => {
  it('should handle initial state', () => {
    expect(searchReducer(undefined, {
      type: 'unknown'
    })).toEqual(initialState);
  });
});