import { loadModules, setDefaultOptions } from 'esri-loader';
import axios from 'axios';
import MapController from '../controllers/MapController';
import store from '../store';
import { setLoading } from '../store/slices/loadingSlice';
import { displayMessage } from '../utils/displayMessage';
import aoiController from './AOIController';

setDefaultOptions({ css: true, version: '4.22' });

class UploadShapefileController {
  _featureLayer?: __esri.FeatureLayer;
  _geometry?: any;

  shapefileUpload = (uploadedFile: any) => {
    if (uploadedFile != '' && uploadedFile.name?.includes('.zip')) {
      const fileName: Array<string> = uploadedFile.name.split('.');
      const params: any = {
        name: fileName,
        targetSR: MapController._mapview?.spatialReference,
        maxRecordCount: 1000,
        enforceInputFileSizeLimit: true,
        enforceOutputJsonSizeLimit: true,
        generalize: true,
        maxAllowableOffset: 10,
        reducePrecision: true,
        numberOfDigitsAfterDecimal: 0,
      };
      const formData = new FormData();
      formData.append('filetype', 'shapefile');
      formData.append('publishParameters', JSON.stringify(params));
      formData.append('f', 'json');
      formData.append('file', uploadedFile);
      this.generateFeatureCollection(formData);
      store.dispatch(setLoading(true));
    } else {
      uploadedFile !== '' ? displayMessage('Please upload a zipped up shapefile.', 'error') : '';
    }
  };
  generateFeatureCollection = async (formData: any) => {
    const portalUrl = 'https://www.arcgis.com';
    try {
      const fetchCollections: any = await axios(portalUrl + '/sharing/rest/content/features/generate', {
        method: 'POST',
        data: formData,
      });
      const { data } = await fetchCollections;
      const featureCollection: any = data.featureCollection;
      await this.addShapefileToMap(featureCollection);
    } catch (error: any) {
      store.dispatch(setLoading(false));
      displayMessage('The zip file does not contain a shapefile.', 'error');
    }
  };
  addShapefileToMap = async (featureCollection: any) => {
    const [Graphic, FeatureLayer, Field] = await loadModules([
      'esri/Graphic',
      'esri/layers/FeatureLayer',
      'esri/layers/support/Field',
    ]);

    let sourceGraphics: any = [];
    this._featureLayer?.destroy();
    const layers = await featureCollection.layers.map((layer: any) => {
      const graphics = layer.featureSet.features.map((feature: any) => {
        return Graphic.fromJSON(feature);
      });
      sourceGraphics = sourceGraphics.concat(graphics);
      const featureLayer = new FeatureLayer({
        objectIdField: 'FID',
        source: graphics,
        title: 'Uploaded Shapefile',
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-fill',
            style: 'solid',
            color: 'rgba(35,114,179,.3)',
            outline: {
              color: '#2372b3',
              width: '2px',
            },
          },
        },

        fields: layer.layerDefinition.fields.map(function (field: __esri.Field) {
          return Field.fromJSON(field);
        }),
      });
      this._featureLayer = featureLayer;
      MapController.generateGeometry(featureLayer, 'upload-shape').then((r) => {
        MapController._mapview?.goTo({ target: featureLayer, zoom: 10, center: r });
        aoiController.AOIIntersectWithIndicator(r[0]);
      });
      return featureLayer;
    });
    MapController._map?.addMany(layers);
    store.dispatch(setLoading(false));
  };
}

const uploadShapefileController = new UploadShapefileController();

export default uploadShapefileController;
