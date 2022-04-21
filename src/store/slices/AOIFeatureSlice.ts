import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface intersectedIndicators {
  indicatorId: string;
  featureSet: any;
  title: string;
  objectIds: any;
}

export interface AOIState {
  AOILabel: string;
  clearSelection: boolean;
  intersectedIndicators: intersectedIndicators[];
  siteNames: string[];
}

const initialState: AOIState = {
  AOILabel: '',
  clearSelection: false,
  intersectedIndicators: [],
  siteNames: [],
};

const aoiSlice = createSlice({
  name: 'appSlice',
  initialState: initialState,
  reducers: {
    setAOILabel: (state: AOIState, action: PayloadAction<string>) => {
      state.AOILabel = action.payload;
    },
    setClearSelection: (state: AOIState, action: PayloadAction<boolean>) => {
      state.clearSelection = action.payload;
    },
    setIntersectedIndicators: (state, action: PayloadAction<intersectedIndicators>) => {
      const current = state.intersectedIndicators;
      state.intersectedIndicators = [...current, action.payload];
    },
    setUpdateIntersectedIndicators: (state, action: PayloadAction<any>) => {
      state.intersectedIndicators = action.payload;
    },
    setSiteNames: (state, action: PayloadAction<string[]>) => {
      state.siteNames = action.payload;
    },
  },
});

//Export actions
export const {
  setAOILabel,
  setClearSelection,
  setIntersectedIndicators,
  setUpdateIntersectedIndicators,
  setSiteNames,
} = aoiSlice.actions;

//Export individual pieces of state
export const AOILabelState = (state: RootState) => state.aoiReducer.AOILabel;
export const clearSelectionState = (state: RootState) => state.aoiReducer.clearSelection;
export const intersectedIndicatorsState = (state: RootState) => state.aoiReducer.intersectedIndicators;
export const siteNamesState = (state: RootState) => state.aoiReducer.siteNames;

export default aoiSlice.reducer;
