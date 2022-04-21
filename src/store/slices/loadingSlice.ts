import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState: initialState,
  reducers: {
    setLoading: (state: LoadingState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

//Export actions
export const { setLoading } = loadingSlice.actions;

//Export individual pieces of state
export const loadingState = (state: RootState) => state.loadingReducer.loading;

export default loadingSlice.reducer;
