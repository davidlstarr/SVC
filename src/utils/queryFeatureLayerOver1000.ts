import { setAllFeaturesDownloaded } from '../store/slices/downloadsSlice';
import store from '../store';

export const getAllFeaturesQuery = async (featureLayer: any, query: any, featuresSoFar: number[]) => {
  query.start = featuresSoFar.length;
  query.num = 1000;
  query.outFields = ['*'];
  query.returnGeometry = false;
  return featureLayer.queryFeatures(query).then((results: any) => {
    if (results.exceededTransferLimit && results.exceededTransferLimit === true) {
      store.dispatch(setAllFeaturesDownloaded(false));
      return getAllFeaturesQuery(featureLayer, query, [...featuresSoFar, ...results.features]);
    } else {
      store.dispatch(setAllFeaturesDownloaded(true));
      results.features = [...featuresSoFar, ...results.features];
      return Promise.resolve(results);
    }
  });
};
