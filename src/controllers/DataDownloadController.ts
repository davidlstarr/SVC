import { CsvDataTypes } from './TableController';
import { ExportToCsv } from 'export-to-csv';
import store from '../store';
import { setCsvDataToDownload, setDownloadAll, setUpdateItemsToDownload } from '../store/slices/downloadsSlice';
import { displayMessage } from '../utils/displayMessage';
import { addEmailToFeatureService } from '../utils/addEmailToFeatureService';
import { ValueTypes } from '../components/ItemsToDownload/ItemsToDownload';
import mapController from './MapController';
import { getAllFeaturesQuery } from '../utils/queryFeatureLayerOver1000';
import { chartProperties, IndicatorsConfigTypes } from '../types/layerType';
import { setDefaultOptions } from 'esri-loader';

setDefaultOptions({ css: true, version: '4.22' });

class DataDownloadController {
  getDataToDownload = (queryResult: __esri.FeatureSet, title: string) => {
    const fields = queryResult.fields.map((field) => field.name);
    const attributes = queryResult.features.map((feature) => {
      return {
        ...feature.attributes,
      };
    });

    attributes.map((item) => {
      queryResult.fields.map((field: any) => {
        if (field.type === 'date') {
          item[field.name] = new Date(item[field.name]).toLocaleDateString('en-US');
        }
      });
    });
    const csvData: CsvDataTypes = { title, fields, data: attributes };
    store.dispatch(setCsvDataToDownload(csvData));
  };

  handleDownloadSubmit = async (event: any, csvDataToDownload: CsvDataTypes[], confirmDownloadData?: ValueTypes) => {
    event.preventDefault();

    // TODO: confirmDownloadData is optional now but after confirming with the team call
    //  this.handleExportCsv(csvDataToDownload); only if email was added successfully
    this.handleExportCsv(csvDataToDownload);

    if (confirmDownloadData) {
      const addEmailResponse = await addEmailToFeatureService(confirmDownloadData);
      if (addEmailResponse) {
        store.dispatch(setUpdateItemsToDownload([]));
        //store.dispatch(setUpdateCsvDataToDownload([]));
        store.dispatch(setDownloadAll(false));
        // this.handleExportCsv(csvDataToDownload);
        displayMessage('downloaded successfully!', 'success');
      } else {
        displayMessage('There was an error! please try again', 'error');
      }
    }
  };

  handleExportCsv = (csvDataToDownload: CsvDataTypes[]) => {
    csvDataToDownload.forEach((data) => {
      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        filename: data.title,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: false,
        headers: data.fields,
      };
      const csvExport = new ExportToCsv(options);
      if (data.data.length > 0) {
        csvExport.generateCsv(data.data);
      }
    });
  };

  queryIndicatorByAOIAndTimeFrame = async (indicator: IndicatorsConfigTypes, chartProperties: chartProperties) => {
    const featureLayer = mapController._map?.layers.find(
      (layer: any) => layer.id === indicator.id
    ) as __esri.FeatureLayer;

    const query = featureLayer.createQuery();
    const dateOptions: any = indicator.dateOptions;
    const startDate = store.getState().appReducer.startDate;
    const endDate = store.getState().appReducer.endDate;

    let definitionExpression = '';
    if (featureLayer.definitionExpression) {
      //filters out objectIds that intersect the AOI
      definitionExpression = ` AND ${featureLayer.definitionExpression}`;
    }

    if (chartProperties.timestampField) {
      query.where = `${chartProperties.timestampField} BETWEEN '${startDate.toLocaleDateString(
        'en-US',
        dateOptions
      )}' AND '${endDate.toLocaleDateString('en-US', dateOptions)}'${definitionExpression}`;
    } else {
      query.where = chartProperties.query;
    }

    getAllFeaturesQuery(featureLayer, query, []).then((queryResult: any) => {
      if (queryResult) {
        this.getDataToDownload(queryResult, indicator.title);
      } else {
        displayMessage('There was an error preparing data to download, please try again', 'error');
        return;
      }
    });
  };
}

const dataDownloadController = new DataDownloadController();
export default dataDownloadController;
