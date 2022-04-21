import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

type ActivePanel = 1 | 2 | 3 | 4 | 5 | number;

export interface AppState {
  activeExplorePanel: ActivePanel;
  searchValue: string;
}

const initialState: AppState = {
  activeExplorePanel: 1,
  searchValue: '',
};

const explorePanelSlice = createSlice({
  name: 'explorePanelSlice',
  initialState: initialState,
  reducers: {
    setActiveExplorePanel: (state: AppState, action: PayloadAction<ActivePanel>) => {
      state.activeExplorePanel = action.payload;
    },
    setSearchValue: (state: AppState, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

//Export actions
export const { setActiveExplorePanel, setSearchValue } = explorePanelSlice.actions;

//Export individual pieces of state
export const activeExplorePanelSelector = (state: RootState) => state.explorePanelReducer.activeExplorePanel;
export const activeSearchValueSelector = (state: RootState) => state.explorePanelReducer.searchValue;

export default explorePanelSlice.reducer;
