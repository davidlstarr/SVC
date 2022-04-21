import { configureStore, combineReducers } from '@reduxjs/toolkit';
import explorePanelReducer from './slices/explorePanelSlice';
import appReducer from './slices/appSlice';
import activePageReducer from './slices/activePageSlice';
import activeLayersReducer from './slices/featureLayerSlice';
import loadingReducer from './slices/loadingSlice';
import aoiReducer from './slices/AOIFeatureSlice';
import chartSlice from './slices/chartSlice';
import downloadsSlice from './slices/downloadsSlice';

const rootReducer = combineReducers({
  appReducer,
  aoiReducer,
  explorePanelReducer,
  activePageReducer,
  activeLayersReducer,
  loadingReducer,
  chartSlice,
  downloadsSlice,
});

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
