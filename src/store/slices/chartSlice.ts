import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface FilterTypes {
  label: string;
  value: string;
}

export interface ChartState {
  filterOptions: FilterTypes[];
  showWetDryChart: boolean;
  fullWidthCharts: boolean;
  chartData: any;
  chartDataReport: any;
  chartType: boolean;
  indicatorChartData: any;
  chartDataBySite: any;
  openChartWidget: boolean;
  year: any;
  chartYear: any;
}

const defaultOptions = [{ label: 'All', value: 'all' }];

const initialState: ChartState = {
  filterOptions: defaultOptions,
  showWetDryChart: false,
  fullWidthCharts: false,
  chartData: [],
  chartDataReport: [],
  chartType: false,
  indicatorChartData: [],
  chartDataBySite: [],
  openChartWidget: false,
  year: [],
  chartYear: [],
};

const chartSlice = createSlice({
  name: 'chartSlice',
  initialState: initialState,
  reducers: {
    setFilterOptions: (state, action: PayloadAction<FilterTypes[]>) => {
      const current = state.filterOptions;
      state.filterOptions = [...current, ...action.payload];
    },
    setShowWetDryChart: (state, action: PayloadAction<boolean>) => {
      state.showWetDryChart = action.payload;
    },
    setFullWidthCharts: (state, action: PayloadAction<boolean>) => {
      state.fullWidthCharts = action.payload;
    },
    setChartData: (state, action: PayloadAction<any>) => {
      state.chartData = action.payload;
    },
    setChartDataReport: (state, action: PayloadAction<any>) => {
      state.chartDataReport = action.payload;
    },
    setChartType: (state, action: PayloadAction<boolean>) => {
      state.chartType = action.payload;
    },
    setResetIndicatorChartData: (state, action: PayloadAction<any>) => {
      state.indicatorChartData = action.payload;
    },
    setIndicatorChartData: (state, action: PayloadAction<any>) => {
      const current = state.indicatorChartData;
      state.indicatorChartData = [...current, action.payload];
    },
    setChartDataPerSiteName: (state, action: PayloadAction<any>) => {
      const current = state.chartDataBySite;
      state.chartDataBySite = [...current, action.payload];
    },
    setOpenChartWidget: (state, action: PayloadAction<boolean>) => {
      state.openChartWidget = action.payload;
    },
    setYear: (state, action: PayloadAction<any>) => {
      state.year = action.payload;
    },
    setChartYear: (state, action: PayloadAction<any>) => {
      state.chartYear = action.payload;
    },
  },
});

//Export actions
export const {
  setFilterOptions,
  setShowWetDryChart,
  setFullWidthCharts,
  setChartData,
  setChartDataReport,
  setChartType,
  setIndicatorChartData,
  setChartDataPerSiteName,
  setOpenChartWidget,
  setYear,
  setChartYear,
  setResetIndicatorChartData,
} = chartSlice.actions;

//Export individual pieces of state
export const filterOptionsState = (state: RootState) => state.chartSlice.filterOptions;
export const showWetDryChartState = (state: RootState) => state.chartSlice.showWetDryChart;
export const fullWidthChartsState = (state: RootState) => state.chartSlice.fullWidthCharts;
export const chartDataState = (state: RootState) => state.chartSlice.chartData;
export const chartDataReportState = (state: RootState) => state.chartSlice.chartDataReport;
export const chartTypeState = (state: RootState) => state.chartSlice.chartType;
export const indicatorChartDataState = (state: RootState) => state.chartSlice.indicatorChartData;
export const siteNameChartDataState = (state: RootState) => state.chartSlice.chartDataBySite;
export const openChartWidgetState = (state: RootState) => state.chartSlice.openChartWidget;
export const yearState = (state: RootState) => state.chartSlice.year;
export const chartYearState = (state: RootState) => state.chartSlice.chartYear;

export default chartSlice.reducer;
