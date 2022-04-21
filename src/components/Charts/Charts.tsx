import { useDispatch, useSelector } from 'react-redux';
import { collapseSidePanelState, smallDevicesWidthState } from '../../store/slices/appSlice';
import {
  chartTypeState,
  fullWidthChartsState,
  setChartType,
  setFullWidthCharts,
  setIndicatorChartData,
  setResetIndicatorChartData,
} from '../../store/slices/chartSlice';
import MapIcon from '../MapIcon/MapIcon';
import './Charts.scss';
import ChartSelector from './ChartTypes/ChartSelector';
import { useEffect } from 'react';
import { selectedDataSetsState } from '../../store/slices/featureLayerSlice';
import { chartProperties, IndicatorsConfigTypes } from '../../types/layerType';
import chartController from '../../controllers/ChartController';
import store from '../../store';
import { setLoading } from '../../store/slices/loadingSlice';

const Charts = () => {
  const collapseSidePanel = useSelector(collapseSidePanelState);
  const fullWidthCharts = useSelector(fullWidthChartsState);
  const smallDevicesWidth = useSelector(smallDevicesWidthState);
  const indicatorSelected = useSelector(selectedDataSetsState);
  const chartType = useSelector(chartTypeState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setResetIndicatorChartData([]));
    dispatch(setLoading(true));
    indicatorSelected.map((indicator: IndicatorsConfigTypes) => {
      indicator.chartType.filter((chart: string) => {
        if (indicatorSelected.length === 1) {
          if (chart === '') {
            dispatch(setChartType(true));
            dispatch(setLoading(false));
          }
        }
        if (indicator.title === 'June wet-dry status') {
          dispatch(setChartType(false));
        }
      });
      if (indicator.chartProperties.length) {
        indicator.chartProperties.map(async (properties: chartProperties) => {
          const attributes = await chartController.getChartData(indicator, properties);
          if (attributes) {
            await chartController.structureChartData(indicator, attributes, properties);
            dispatch(setLoading(false));
          }
        });
      } else {
        store.dispatch(setIndicatorChartData(indicator));
        dispatch(setLoading(false));
      }
    });
  }, []);

  const handleCollapseChartPanel = () => {
    dispatch(setFullWidthCharts(!fullWidthCharts));
  };

  const hideMap = fullWidthCharts || smallDevicesWidth ? 'full-width chart-wrapper' : 'chart-wrapper';
  const toggleClassName = collapseSidePanel && fullWidthCharts ? 'diplay-full-width-charts chart-wrapper' : hideMap;
  const smallDeviceWidth =
    smallDevicesWidth && !collapseSidePanel ? `${smallDevicesWidth - 590}px` : `${smallDevicesWidth}px`;
  return (
    <>
      {!chartType && (
        <div className='StepFourCharts'>
          <div className={toggleClassName} style={{ minWidth: smallDeviceWidth }}>
            <ChartSelector />
            <MapIcon
              fullWidthCharts={fullWidthCharts}
              handleCollapseChartPanel={handleCollapseChartPanel}
              className='chart-panel-icon'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Charts;
