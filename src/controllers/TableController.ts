import { loadModules, setDefaultOptions } from 'esri-loader';
import { RefObject } from 'react';
import store from '../store';
import { getAllFeaturesQuery } from '../utils/queryFeatureLayerOver1000';
import DataDownloadController from './DataDownloadController';
import { displayMessage } from '../utils/displayMessage';

setDefaultOptions({ css: true, version: '4.22' });

export interface CsvDataTypes {
  title: string;
  fields: string[];
  data: any[];
}

export interface fieldsConfig {
  name: string;
  alias: string;
  format: {
    digitSeparator: boolean;
  };
}

class TableController {
  _featureLayer?: any;
  _featureTable?: __esri.FeatureTable;

  initializeTableController = async (domRef: RefObject<HTMLDivElement>, layerTitle: string, layerUrl: string) => {
    //The dom is required for esri modules.
    if (!domRef.current) {
      return;
    }
    const [FeatureTable, FeatureLayer] = await loadModules(['esri/widgets/FeatureTable', 'esri/layers/FeatureLayer']);
    const csvDataToDownload = store.getState().downloadsSlice.csvDataToDownload;

    if (layerUrl) {
      this._featureLayer = new FeatureLayer({
        url: layerUrl,
        title: layerTitle,
      }) as __esri.FeatureLayer;

      const featureTable = new FeatureTable({
        layer: this._featureLayer,
        visibleElements: {
          header: true,
          selectionColumn: false,
          menu: true,
        },

        container: 'dataset-table',
      });

      this._featureTable = featureTable;
      this._featureLayer.when(() => {
        const removeCommaSep: fieldsConfig[] = [];
        this._featureLayer.fields.map((item: any) => {
          removeCommaSep.push({
            name: item.name,
            alias: item.name,
            format: {
              digitSeparator: false,
            },
          });
        });
        featureTable.fieldConfigs = removeCommaSep;
      });
      // only add it if its not already in csvDataToDownload
      if (csvDataToDownload.some((item: CsvDataTypes) => item.title === layerTitle)) {
        return;
      }
      const query = this._featureLayer.createQuery();
      getAllFeaturesQuery(this._featureLayer, query, []).then((queryResult: any) => {
        if (queryResult) {
          DataDownloadController.getDataToDownload(queryResult, layerTitle);
        } else {
          displayMessage('There was an error preparing data to download, please try again', 'error');
          return;
        }
      });
    }
  };

  resetTable = () => {
    this._featureLayer?.destroy();
    this._featureTable?.destroy();
  };
}

const tableController = new TableController();

export default tableController;
