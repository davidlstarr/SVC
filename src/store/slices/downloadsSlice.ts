import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CsvDataTypes } from '../../controllers/TableController';
import { RootState } from '../index';

export interface DownloadsState {
  itemsToDownload: any[];
  csvDataToDownload: CsvDataTypes[];
  exploreDownloadData: boolean;
  downloadAll: boolean;
  pdfDownload: boolean;
  allFeaturesDownloaded: boolean;
}

const initialState: DownloadsState = {
  itemsToDownload: [],
  csvDataToDownload: [],
  exploreDownloadData: false,
  downloadAll: false,
  pdfDownload: false,
  allFeaturesDownloaded: false,
};

const downloadsSlice = createSlice({
  name: 'downloadsSlice',
  initialState: initialState,
  reducers: {
    setItemsToDownload: (state, action: PayloadAction<any>) => {
      const current = state.itemsToDownload;
      state.itemsToDownload = [...current, action.payload];
    },
    setUpdateItemsToDownload: (state, action: PayloadAction<any[]>) => {
      state.itemsToDownload = action.payload;
    },
    setCsvDataToDownload: (state, action: PayloadAction<CsvDataTypes>) => {
      const current = state.csvDataToDownload;
      state.csvDataToDownload = [...current, action.payload];
    },
    setUpdateCsvDataToDownload: (state, action: PayloadAction<any[]>) => {
      state.csvDataToDownload = action.payload;
    },
    setExploreDownloadData: (state, action: PayloadAction<boolean>) => {
      state.exploreDownloadData = action.payload;
    },
    setDownloadAll: (state, action: PayloadAction<boolean>) => {
      state.downloadAll = action.payload;
    },
    setPdfDownload: (state, action: PayloadAction<boolean>) => {
      state.pdfDownload = action.payload;
    },
    setAllFeaturesDownloaded: (state, action: PayloadAction<boolean>) => {
      state.allFeaturesDownloaded = action.payload;
    },
  },
});

//Export actions
export const {
  setItemsToDownload,
  setUpdateItemsToDownload,
  setCsvDataToDownload,
  setUpdateCsvDataToDownload,
  setExploreDownloadData,
  setDownloadAll,
  setPdfDownload,
  setAllFeaturesDownloaded,
} = downloadsSlice.actions;

//Export individual pieces of state
export const itemsToDownloadState = (state: RootState) => state.downloadsSlice.itemsToDownload;
export const csvDataToDownloadState = (state: RootState) => state.downloadsSlice.csvDataToDownload;
export const exploreDownloadDataState = (state: RootState) => state.downloadsSlice.exploreDownloadData;
export const downloadAllState = (state: RootState) => state.downloadsSlice.downloadAll;
export const pdfDownloadState = (state: RootState) => state.downloadsSlice.pdfDownload;
export const allFeaturesDownloadedState = (state: RootState) => state.downloadsSlice.allFeaturesDownloaded;

export default downloadsSlice.reducer;
