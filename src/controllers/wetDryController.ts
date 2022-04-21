import { loadModules, setDefaultOptions } from 'esri-loader';
import store from '../store';
import { setLoading } from '../store/slices/loadingSlice';
import { AttributeTypes } from '../components/Map/WetDryChartWidget/WetDryChartWidget';
import { setChartData, setChartDataReport, setOpenChartWidget, setYear } from '../store/slices/chartSlice';
import mapController from './MapController';
import timeSliderController from './timeSliderController';

setDefaultOptions({ css: true, version: '4.22' });

class WetDryController {
  _highlight?: any;
  activateViewExtentQuery = async (featureLayer: __esri.FeatureLayer) => {
    const [watchUtils] = await loadModules(['esri/core/watchUtils']);
    let interval = 0;
    mapController._mapview?.when(async () => {
      const layerView = await mapController._mapview?.whenLayerView(featureLayer);

      if (layerView) {
        watchUtils.whenTrue(mapController._mapview, 'stationary', async () => {
          watchUtils.whenFalseOnce(layerView, 'updating', async () => {
            const yearSelected = store.getState().chartSlice.year;
            const label = yearSelected && yearSelected?.label;
            const DEFAULT_YEAR = '2021';

            interval++;
            store.dispatch(setLoading(true));

            if (interval === 1) {
              // this will only run once
              const chartData = (await this.getWetDryData(DEFAULT_YEAR)) as AttributeTypes[];

              this.structureWetDryChartData(DEFAULT_YEAR, chartData);
              store.dispatch(setYear({ value: DEFAULT_YEAR, label: DEFAULT_YEAR }));
            } else {
              // if user selects a year from dropdown then keep that filter by year even when user zoom in/zoom out
              if (label && label !== 'Map extent' && label !== 'All') {
                const chartData = (await this.getWetDryData(yearSelected.label)) as AttributeTypes[];
                this.structureWetDryChartData(yearSelected.label, chartData);
              } else {
                // otherwise query everything visible on map view extent
                const yearLabel = label === 'All' ? label : 'Map extent';
                const chartData = (await this.queryDataByViewExtent(layerView)) as AttributeTypes[];
                this.structureWetDryChartData('All', chartData);
                store.dispatch(setYear({ value: yearLabel, label: yearLabel }));
              }
            }
            store.dispatch(setLoading(false));
            store.dispatch(setOpenChartWidget(true));
          });
        });
      }
    });
  };
  getWetDryData = async (year: string | any, report?: boolean) => {
    const featureLayer = mapController._map?.layers.find(
      (layer: any) => layer.title === 'June wet-dry status'
    ) as __esri.FeatureLayer;
    let byYear = `Year='${year}' AND Name='San Pedro River'`;
    if (report) {
      let definitionExpression = '';
      if (featureLayer?.definitionExpression) {
        definitionExpression = ` AND ${featureLayer.definitionExpression}`;
      }
      byYear = `Year BETWEEN '${year.startDate}' AND '${year.endDate}'${definitionExpression}`;
    }

    if (featureLayer) {
      const query = featureLayer.createQuery();
      if (!report) {
        const mapExtent = mapController._mapview?.extent;
        if (!mapExtent) return;
        query.geometry = mapExtent;
      }
      query.where = year === 'All' ? '1=1' : byYear;
      query.outFields = ['FMEAS_mile', 'TMEAS_mile', 'Year', 'FID'];

      try {
        const queryResult = await featureLayer.queryFeatures(query);
        return queryResult.features.map((feature: any) => feature.attributes);
      } catch (error) {
        return;
      }
    }
  };
  structureWetDryChartData = (label: 'All' | string | any, attributes: AttributeTypes[], type?: string) => {
    const newChartData = attributes.map((data: AttributeTypes) => {
      return {
        stack: Number(data.Year),
        pointWidth: label === 'All' ? 8 : 50,
        color: '#2372b3',
        lineId: data.FID,
        data: [{ FID: data.FID, x: Number(data.Year), low: data.FMEAS_mile, high: data.TMEAS_mile }],
      };
    });

    type === 'export-report'
      ? store.dispatch(setChartDataReport(newChartData))
      : store.dispatch(setChartData(newChartData));
  };
  queryDataByViewExtent = async (layerView: __esri.LayerView) => {
    if (layerView) {
      const layer = layerView.layer as __esri.FeatureLayer;
      const mapExtent = mapController._mapview?.extent;
      if (!mapExtent) return;

      const query = layer.createQuery();
      query.geometry = mapExtent;
      query.returnGeometry = false;
      query.outFields = ['FMEAS_mile', 'TMEAS_mile', 'Year', 'FID'];

      try {
        const queryLayerView = await layer.queryFeatures(query);
        return queryLayerView.features.map((feature) => feature.attributes);
      } catch (error) {
        return;
      }
    }
  };
  highlightLineOnHover = (FID: number) => {
    this.removeHighlight();
    this._highlight = timeSliderController._layerView?.highlight([FID]);
  };

  removeHighlight = () => {
    if (this._highlight) {
      this._highlight.remove();
    }
  };
  resetWetDryProperties = () => {
    const wetLayer = mapController._map?.layers.find((layer: any) => layer.id === 'wet-dry-full-river');
    if (wetLayer) {
      mapController._map?.remove(wetLayer);
    }
    store.dispatch(setChartData([]));
    store.dispatch(setYear({ value: null, label: null }));
    store.dispatch(setOpenChartWidget(false));
    //this._timeSlider?.destroy();
  };
}

const wetDryController = new WetDryController();

export default wetDryController;
