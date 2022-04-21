import { loadModules, setDefaultOptions } from 'esri-loader';
import mapController from './MapController';
import { AttributeTypes } from '../components/Map/WetDryChartWidget/WetDryChartWidget';
import store from '../store';
import { setOpenChartWidget, setShowWetDryChart, setYear } from '../store/slices/chartSlice';
import wetDryController from './wetDryController';
import { setTimeSliderWidget } from '../store/slices/appSlice';

setDefaultOptions({ css: true, version: '4.22' });

class TimeSliderController {
  _timeSlider?: __esri.TimeSlider | any;
  _layerView?: __esri.LayerView | any;
  _watchSlider?: __esri.WatchHandle;

  addTimeSliderWidget = async (featureLayer: any, layerTitle?: string) => {
    const [TimeSlider] = await loadModules(['esri/widgets/TimeSlider']);
    const timeSlider = new TimeSlider({
      view: mapController._mapview,
      timeVisible: true,
      loop: true,
      visible: true,
    });

    if (layerTitle === 'June wet-dry status') {
      timeSlider.container = 'wetDryTimeSlider';
    } else {
      store.dispatch(setShowWetDryChart(false));
      timeSlider.container = 'timeSlider';
    }
    this._timeSlider = timeSlider;
    mapController._mapview?.ui.add(timeSlider, 'bottom-left');
    if (featureLayer) {
      store.dispatch(setTimeSliderWidget(true));
      mapController._mapview?.whenLayerView(featureLayer).then((layerView) => {
        this._layerView = layerView;
        const dateOptions = { year: 'numeric' };
        const endYear = featureLayer.timeInfo.fullTimeExtent?.end.toLocaleDateString('en-US', dateOptions);
        let startYear = featureLayer.timeInfo.fullTimeExtent?.start.toLocaleDateString('en-US', dateOptions);
        if (featureLayer.title === 'June wet-dry status') {
          startYear = endYear;
        }

        timeSlider.fullTimeExtent = featureLayer.timeInfo.fullTimeExtent?.expandTo('years');
        timeSlider.timeExtent = {
          start: new Date(startYear, 1, 1),
          end: new Date(endYear, 12, 1),
        };

        if (featureLayer.timeInfo.interval) {
          timeSlider.stops = {
            interval: featureLayer.timeInfo.interval,
          };
        } else {
          timeSlider.stops = {
            interval: { unit: 'years', value: 1 },
          };
        }
      });
      if (featureLayer.label !== 'indicator') {
        this.watchTimeSliderEvents(timeSlider);
      }
    }
  };
  watchTimeSliderEvents = async (timeSlider: __esri.TimeSlider) => {
    let interval = 0;
    this._watchSlider = timeSlider.viewModel.watch('state', async (state) => {
      interval++;

      if (interval > 1 && state === 'ready') {
        const lastYear = timeSlider.values.length ? String(new Date(timeSlider.values[1]).getFullYear()) : '';

        if (lastYear) {
          const chartData = (await wetDryController.getWetDryData(lastYear)) as AttributeTypes[];
          wetDryController.structureWetDryChartData(lastYear, chartData);
          store.dispatch(setYear({ value: lastYear, label: lastYear }));
          store.dispatch(setOpenChartWidget(true));
        }
      }
    }) as __esri.WatchHandle;
  };
  updateTimeSliderValues = (year: string, displayAll: boolean) => {
    // parse year to last day of december as default
    const yearAvailable = year === '1999' ? Number(year) : Number(year);
    const parseStartYear = this.parseDateByStrYear(yearAvailable);
    const parseEndYear = new Date(Number(year), 12, 1);
    const defaultStartYear = this.parseDateByStrYear(1999);
    const defaultEndYear = this.parseDateByStrYear(2021);

    const timeSlider = timeSliderController._timeSlider as any;
    if (timeSlider) {
      timeSlider.timeExtent = {
        start: displayAll ? defaultStartYear : parseStartYear,
        end: displayAll ? defaultEndYear : parseEndYear,
      };
    }
  };
  parseDateByStrYear = (year: number) => {
    return new Date(year, 5, 30);
  };
  addTimeSliderWidgetMapBtn = async () => {
    const [Expand] = await loadModules(['esri/widgets/Expand']);
    const timeSliderExpand = new Expand({
      expandIconClass: 'esri-icon-timeslider',
      view: mapController._mapview,
      container: 'timeslider-widget-wrapper',
      expandTooltip: 'Close Timeslider',
    });
    mapController._mapview?.ui.add(timeSliderExpand, 'top-left');
  };
}

const timeSliderController = new TimeSliderController();

export default timeSliderController;
