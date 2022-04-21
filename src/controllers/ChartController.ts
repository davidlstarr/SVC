import mapController from './MapController';
import { chartProperties, IndicatorsConfigTypes } from '../types/layerType';
import store from '../store';
import { setChartYear, setIndicatorChartData } from '../store/slices/chartSlice';
import { setLoading } from '../store/slices/loadingSlice';
import { getAllFeaturesQuery } from '../utils/queryFeatureLayerOver1000';
import { setDefaultOptions } from 'esri-loader';

setDefaultOptions({ css: true, version: '4.22' });

class ChartController {
  getChartData = async (indicator: IndicatorsConfigTypes, chartProperties: chartProperties) => {
    const featureLayer = mapController._map?.layers.find((layer: any) => {
      let featureLayerFilter = layer.id === indicator.id;
      if (indicator.title === 'Streamflow permanence') {
        featureLayerFilter = layer.id.includes(indicator.id) && layer.id.includes('non-indicator');
      }
      return featureLayerFilter;
    }) as __esri.FeatureLayer;

    if (featureLayer) {
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
      query.outFields = chartProperties.outFields;
      query.orderByFields = chartProperties.orderByFields;
      query.returnGeometry = false;

      return await getAllFeaturesQuery(featureLayer, query, []).then((queryResult: any) => {
        if (queryResult) {
          return queryResult.features.map((feature: any) => feature.attributes);
        } else {
          store.dispatch(setIndicatorChartData(indicator));
          store.dispatch(setLoading(false));
        }
      });
    }
  };
  structureChartData = (indicator: any, attributes: any[], chartProperties: any) => {
    let year: any = [];
    let parseYear: any = [];
    let yData: any = [];
    let chartData: any = [];
    let chartName: string[] = [];
    year = [];
    chartData = [];
    chartName = [];
    store.dispatch(setChartYear([]));
    attributes.map((data: any) => {
      const nonZeroLayerIds = ['16'];
      if (
        nonZeroLayerIds.includes(indicator.id) ? data[chartProperties.dataField] > 0 : data[chartProperties.dataField]
      ) {
        if (chartProperties.timestampField.length > 0) {
          parseYear = new Date(data[chartProperties.timestampField]).getTime();
          yData = data[chartProperties.dataField];
          year.push(parseYear);
        }
        const roundDecimalYData = parseFloat(yData).toFixed(3);
        const constructData = {
          name: data[chartProperties.siteNameField],
          additionalData: [parseYear, data[chartProperties.additionalDataField]],
          x: parseYear,
          y: parseFloat(roundDecimalYData),
          xy: [parseYear, parseFloat(roundDecimalYData)],
        };

        chartName.push(data[chartProperties.siteNameField]);
        chartData.push(constructData);
      }
    });

    chartData.sort((a: any, b: any) => a.x - b.x);
    year.sort((a: any, b: any) => a - b);

    const indicatorChartData = this.getIndicatorChartData(chartData, chartName, indicator);

    store.dispatch(setChartYear(year));

    const indicatorData = {
      ...indicator,
      chartData: indicatorChartData,
    };

    store.dispatch(setIndicatorChartData(indicatorData));
  };

  getIndicatorChartData = (chartData: any, chartName: any, indicator: any) => {
    const groupChartDataByName = this.groupChartDataByName(chartData, 'name');
    const getUniqueNames = chartName.filter(this.getUniqueValues);

    return getUniqueNames.map((siteName: string) => {
      const getXY = groupChartDataByName[siteName].map((data: any) => data.xy);
      const additionalData = groupChartDataByName[siteName].map((data: any) => data.additionalData);
      return {
        name: siteName,
        id: indicator.id,
        data: getXY,
        additionalData: additionalData,
        visible: true,
      };
    });
  };

  groupChartDataByName = (objectArray: any, property: any) => {
    return objectArray.reduce((acc: any, obj: any) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  };

  getUniqueValues = (value: any, index: any, self: any) => {
    return self.indexOf(value) === index;
  };
}

const chartController = new ChartController();

export default chartController;
