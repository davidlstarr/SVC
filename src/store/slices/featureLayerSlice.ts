import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { layersConfig } from '../../configs/layers.config';
import { IndicatorsConfigTypes, LayersConfigTypes } from '../../types/layerType';
import { RootState } from '../index';

export const stepOneDefaultValues = {
  id: '',
  parentID: '',
  url: '',
  objectIDField: '',
  dateOptions: {},
  label: '',
  title: '',
  symbol: '',
  tooltipDescription: '',
  description: '',
  checked: false,
  chartType: [],
  chartProperties: [],
  chartData: [],
  popupTemplate: [],
};

export interface AppState {
  layersData: LayersConfigTypes[];
  layersDataCopy: LayersConfigTypes[];
  layersDataMultipleCopy: any;
  selectedDataSets: any;
  stepOneSelectedDataSet: IndicatorsConfigTypes;
  downloadDataIndicators: any;
  checkedIndicators: any;
}

const initialState: AppState = {
  layersData: layersConfig,
  layersDataCopy: layersConfig,
  layersDataMultipleCopy: [],
  selectedDataSets: [],
  stepOneSelectedDataSet: stepOneDefaultValues,
  downloadDataIndicators: [],
  checkedIndicators: [],
};

const activeLayersSlice = createSlice({
  name: 'activeLayersSlice',
  initialState: initialState,
  reducers: {
    setLayersData: (state, action: PayloadAction<LayersConfigTypes[]>) => {
      state.layersData = action.payload;
    },
    setLayersDataCopy: (state, action: PayloadAction<LayersConfigTypes[]>) => {
      state.layersDataCopy = action.payload;
    },
    setLayersDataMultiple: (state, action: PayloadAction<any>) => {
      state.layersDataMultipleCopy = action.payload;
    },
    setLayersDataMultipleCopy: (state, action: PayloadAction<any>) => {
      const current = state.layersDataMultipleCopy;
      state.layersDataMultipleCopy = [...current, action.payload];
    },

    setSingleSelectedDataSet: (state, action: PayloadAction<any>) => {
      state.selectedDataSets = action.payload;
    },
    setMultipleSelectedDataSets: (state, action: PayloadAction<any>) => {
      const current = state.selectedDataSets;
      state.selectedDataSets = [...current, action.payload];
    },
    setStepOneSelectedDataSet: (state, action: PayloadAction<IndicatorsConfigTypes>) => {
      state.stepOneSelectedDataSet = action.payload;
    },
    setDownloadDataIndicators: (state, action: PayloadAction<any>) => {
      const current = state.downloadDataIndicators;
      state.downloadDataIndicators = [...current, action.payload];
    },
    setUpdateDownloadDataIndicators: (state, action: PayloadAction<any>) => {
      state.downloadDataIndicators = action.payload;
    },
    setCheckedIndicators: (state, action: PayloadAction<any>) => {
      const current = state.checkedIndicators;
      state.checkedIndicators = [...current, action.payload];
    },
  },
});

//Export actions
export const {
  setLayersData,
  setLayersDataCopy,
  setSingleSelectedDataSet,
  setMultipleSelectedDataSets,
  setStepOneSelectedDataSet,
  setDownloadDataIndicators,
  setUpdateDownloadDataIndicators,
  setLayersDataMultipleCopy,
  setLayersDataMultiple,
  setCheckedIndicators,
} = activeLayersSlice.actions;

//Export individual pieces of state
export const layersDataState = (state: RootState) => state.activeLayersReducer.layersData;
export const layersDataCopyState = (state: RootState) => state.activeLayersReducer.layersDataCopy;
export const selectedDataSetsState = (state: RootState) => state.activeLayersReducer.selectedDataSets;
export const stepOneSelectedDataSetState = (state: RootState) => state.activeLayersReducer.stepOneSelectedDataSet;
export const downloadDataIndicatorsState = (state: RootState) => state.activeLayersReducer.downloadDataIndicators;
export const LayersDataMultipleCopyState = (state: RootState) => state.activeLayersReducer.layersDataMultipleCopy;
export const checkedIndicatorsState = (state: RootState) => state.activeLayersReducer.checkedIndicators;

export default activeLayersSlice.reducer;
