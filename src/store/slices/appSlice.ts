import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface AppState {
  startDate: any;
  endDate: any;
  collapseSidePanel: boolean;
  smallDevicesWidth: null | number;
  mapImage: any;
  legendImage: any;
  timeSlider: boolean;
  timesliderWidget: boolean;
  popupFeatures: any;
}

const initialState: AppState = {
  startDate: null,
  endDate: null,
  collapseSidePanel: false,
  smallDevicesWidth: null,
  mapImage: null,
  legendImage: null,
  timeSlider: true,
  timesliderWidget: false,
  popupFeatures: [],
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState: initialState,
  reducers: {
    setStartDate: (state: AppState, action: PayloadAction<any>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state: AppState, action: PayloadAction<any>) => {
      state.endDate = action.payload;
    },
    setCollapseSidePanel: (state, action: PayloadAction<boolean>) => {
      state.collapseSidePanel = action.payload;
    },
    setSmallDevicesWidth: (state, action: PayloadAction<null | number>) => {
      state.smallDevicesWidth = action.payload;
    },
    setMapImage: (state, action: PayloadAction<any>) => {
      state.mapImage = action.payload;
    },
    setLegendImage: (state, action: PayloadAction<any>) => {
      state.legendImage = action.payload;
    },
    setTimeSlider: (state, action: PayloadAction<boolean>) => {
      state.timeSlider = action.payload;
    },
    setTimeSliderWidget: (state, action: PayloadAction<boolean>) => {
      state.timesliderWidget = action.payload;
    },
    setPopupFeatures: (state, action: PayloadAction<any>) => {
      state.popupFeatures = action.payload;
    },
  },
});

//Export actions
export const {
  setStartDate,
  setEndDate,
  setCollapseSidePanel,
  setSmallDevicesWidth,
  setMapImage,
  setLegendImage,
  setTimeSlider,
  setTimeSliderWidget,
  setPopupFeatures,
} = appSlice.actions;

//Export individual pieces of state
export const activeStartDateState = (state: RootState) => state.appReducer.startDate;
export const activeEndDateState = (state: RootState) => state.appReducer.endDate;
export const collapseSidePanelState = (state: RootState) => state.appReducer.collapseSidePanel;
export const smallDevicesWidthState = (state: RootState) => state.appReducer.smallDevicesWidth;
export const mapImageState = (state: RootState) => state.appReducer.mapImage;
export const legendImageState = (state: RootState) => state.appReducer.legendImage;
export const timeSliderWidgetState = (state: RootState) => state.appReducer.timesliderWidget;
export const timeSliderState = (state: RootState) => state.appReducer.timeSlider;
export const popupFeaturesState = (state: RootState) => state.appReducer.popupFeatures;

export default appSlice.reducer;
