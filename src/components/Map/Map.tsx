import { useEffect, useRef, useState } from 'react';
import MapController from '../../controllers/MapController';
import timeSliderController from '../../controllers/timeSliderController';
import WidgetContainer from './widget-container';
import Legend from './Legend';
import './Map.scss';
import '../../styles/widgets.scss';
import WetDryChartWidget from './WetDryChartWidget/WetDryChartWidget';
import { useDispatch, useSelector } from 'react-redux';
import { fullWidthChartsState, showWetDryChartState } from '../../store/slices/chartSlice';
import { popupFeaturesState, setTimeSlider, timeSliderState, timeSliderWidgetState } from '../../store/slices/appSlice';
const Map = () => {
  const [distanceMeasurementVisible, setDistanceMeasurementVisible] = useState(false);
  const showWetDryChart = useSelector(showWetDryChartState);
  const fullWidthCharts = useSelector(fullWidthChartsState);
  const timeSliderWidget = useSelector(timeSliderWidgetState);
  const timeslider = useSelector(timeSliderState);
  const popFeatures = useSelector(popupFeaturesState);
  const mapViewRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    MapController.initializeMap(mapViewRef);
  }, []);

  const toggleMeasurementWidget = (measurementType: any) => {
    // Disable the appropriate widget if it is enabled
    if (distanceMeasurementVisible) {
      setDistanceMeasurementVisible(false);
      MapController._distanceMeasurementWidget?.viewModel.clear();
    } else {
      switch (measurementType) {
        case 'distance':
          setDistanceMeasurementVisible(!distanceMeasurementVisible);
          MapController._distanceMeasurementWidget?.viewModel.start();
          MapController.activeMeasurementWidget = 'distance';
          break;
        default:
          setDistanceMeasurementVisible(false);
          MapController.activeMeasurementWidget = null;
      }
    }
  };

  const toggleTimeSliderWidget = () => {
    dispatch(setTimeSlider(!timeslider));
    timeSliderController._timeSlider.visible = !timeslider;
  };

  const toggleMap = fullWidthCharts ? 'hide-map mapview-container' : 'mapview-container';
  return (
    <div className={toggleMap} style={popFeatures.length > 0 ? { height: '65%' } : { height: '100%' }}>
      <div id='mapView' ref={mapViewRef}></div>
      <div id='measurement-widgets-container' className='measurement-widgets-container'>
        <div
          data-html={true}
          title='Measure distance between two or more points'
          id={'distance-measurement-selector'}
          className={`toggle-distance-measurement-selector no-bottom-margin ${
            distanceMeasurementVisible ? ' selected' : ''
          } esri-widget-button esri-widget esri-interactive esri-component`}
          onClick={() => toggleMeasurementWidget('distance')}
        >
          <span className='esri-icon-measure' />
        </div>
        <WidgetContainer
          visible={distanceMeasurementVisible}
          classNames='widget-selector-container distance-selector'
          ids='distance-container-div'
        />
      </div>
      <div id='viewDiv'></div>
      <div id='wetDryTimeSlider'></div>
      <div id='timeSlider'></div>
      <div
        id='timeslider-widget-wrapper'
        onClick={toggleTimeSliderWidget}
        className={
          timeSliderWidget ? 'widget-active esri-component esri-expand esri-widget esri-expand--auto' : 'not-active'
        }
      ></div>
      <div id='basemap-widgets-container' className='basemap-widgets-container'>
        <div id='basemap-wrapper-container'>
          <div className='basemap-instructions'>Select Basemap</div>
        </div>
      </div>
      <Legend />
      {showWetDryChart && <WetDryChartWidget />}
    </div>
  );
};

export default Map;
