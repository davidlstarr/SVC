import { addFeatures, IFeature } from '@esri/arcgis-rest-feature-layer';
import { ValueTypes } from '../components/ItemsToDownload/ItemsToDownload';
import config from '../configs/index';

export const addEmailToFeatureService = async (values: ValueTypes) => {
  const { email, terms } = values;
  const { serviceUrls } = config;
  const attributes = { Email: email, Mailing_List: terms ? 'Yes' : 'No' };
  const features = [{ attributes }] as IFeature[];

  try {
    const response = await addFeatures({ url: serviceUrls.addEmail, features });
    return response.addResults.length && response.addResults[0].success ? true : false;
  } catch (error) {
    return false;
  }
};
