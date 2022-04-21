import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

type ActivePage = 'explore-data' | 'download-data' | 'question-mark';

export interface AppState {
  activePage: ActivePage;
}

const initialState: AppState = {
  activePage: 'explore-data',
};

const activePageSlice = createSlice({
  name: 'activePageSlice',
  initialState: initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<ActivePage>) => {
      state.activePage = action.payload;
    },
  },
});

//Export actions
export const { setActivePage } = activePageSlice.actions;

//Export individual pieces of state
export const activePageState = (state: RootState) => state.activePageReducer.activePage;

export default activePageSlice.reducer;
