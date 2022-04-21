import { IndicatorsConfigTypes } from '../../../types/layerType';
import { useDispatch, useSelector } from 'react-redux';
import { chartDataReportState, fullWidthChartsState, indicatorChartDataState } from '../../../store/slices/chartSlice';
import { useEffect, useState } from 'react';
import { activeEndDateState, activeStartDateState, collapseSidePanelState } from '../../../store/slices/appSlice';
import chartsConfig from './ChartTypes';
import WetDryChart from '../../WetDryChart/WetDryChart';
import { selectedDataSetsState } from '../../../store/slices/featureLayerSlice';
import { setLoading } from '../../../store/slices/loadingSlice';
import parse from 'html-react-parser';
import sanPedroWaterQualityGraph1 from '../../../assets/san_pedro_water_quality_graph1.png';
import springsWaterQualityGraph1 from '../../../assets/springs_water_quality_graph1.png';
import springsWaterQualityGraph2 from '../../../assets/springs_water_quality_graph2.png';
import aquiferStorageGraph1 from '../../../assets/aquifer_storage_graph1.png';
import aquiferStorageGraph2 from '../../../assets/aquifer_storage_graph2.png';
import wetDryController from '../../../controllers/wetDryController';

interface Props {
  selectedIndicator: any;
}

const ChartSelector = ({ report }: any) => {
  const { AreaChart, PieChart, LineChart, BarChart, ScatterChart } = chartsConfig;
  const collapseSidePanel = useSelector(collapseSidePanelState);
  const fullWidthCharts = useSelector(fullWidthChartsState);
  const chartData = useSelector(indicatorChartDataState);
  const [containerWidth, setContainerWidth] = useState(500);
  const selectedDatasets: any = useSelector(selectedDataSetsState);
  const wetDryChartData = useSelector(chartDataReportState);
  const startDate: any = useSelector(activeStartDateState);
  const endDate: any = useSelector(activeEndDateState);
  const dateChartOptions = { year: 'numeric' };
  const wetDryChart = selectedDatasets.filter((indicator: IndicatorsConfigTypes) => indicator.title.includes('wet'));
  const dispatch = useDispatch();

  useEffect(() => {
    const width = document.querySelector('.Charts')?.clientWidth;
    if (!width) return;
    setContainerWidth(width - 100);
  }, [fullWidthCharts, collapseSidePanel]);

  useEffect(() => {
    if (wetDryChart.length > 0) {
      getChartDataWetDryByYear();
    }
  }, []);

  const getChartDataWetDryByYear = async () => {
    const year = {
      startDate: `${startDate.toLocaleDateString('en-US', dateChartOptions)}`,
      endDate: `${endDate.toLocaleDateString('en-US', dateChartOptions)}`,
    };
    const attributes = await wetDryController.getWetDryData(year, true);
    if (attributes && !!attributes.length) {
      wetDryController.structureWetDryChartData('All', attributes, 'export-report');
      dispatch(setLoading(false));
    }
  };

  const ReturnChart = ({ selectedIndicator }: Props) => {
    const indicatorCharts = selectedIndicator.chartType.map((chart: string, index: number) => {
      switch (chart) {
        case 'AreaChart':
          return <AreaChart key={index} fullWidthCharts={fullWidthCharts} containerWidth={containerWidth} />;
        case 'LineChart':
          return (
            <LineChart
              key={selectedIndicator.id}
              chartData={selectedIndicator.chartData}
              selectedIndicator={selectedIndicator}
            />
          );
        case 'PieChart':
          return <PieChart key={selectedIndicator.id} />;
        case 'BarChart':
          return (
            <BarChart
              key={selectedIndicator.id}
              chartData={selectedIndicator.chartData}
              selectedIndicator={selectedIndicator}
            />
          );
        case 'ScatterChart':
          return (
            <ScatterChart
              key={selectedIndicator.id}
              chartData={selectedIndicator.chartData}
              selectedIndicator={selectedIndicator}
            />
          );
        default:
          return null;
      }
    });

    return (
      <div id={selectedIndicator.label} style={{ paddingBottom: '20px' }}>
        {indicatorCharts}
      </div>
    );
  };
  if (report) {
    return chartData.map((indicator: IndicatorsConfigTypes, index: number) => (
      <div className='indicator-container' id='content' key={index}>
        <div className='indicator-content'>
          <div className='indicator-title'>{indicator.title}</div>
          {indicator.description && <div className='indicator-description'>{parse(indicator.description)}</div>}
        </div>
        <div className='chart' style={{ width: '600px' }}>
          {indicator.title.includes('wet') && wetDryChart.length > 0 && (
            <WetDryChart chartData={wetDryChartData} containerWidth={containerWidth} />
          )}
          {indicator.title === 'San Pedro River water quality' && (
            <a href='https://pubs.er.usgs.gov/publication/sir20165114'>
              <img src={sanPedroWaterQualityGraph1} alt='San Pedro Water Quality Graph 1' />
            </a>
          )}
          {indicator.title === 'Springs water quality' && (
            <>
              <a href='https://pubs.er.usgs.gov/publication/sir20165114'>
                <img src={springsWaterQualityGraph1} alt='Springs Water Quality Graph 1' />
              </a>
              <a href='https://pubs.er.usgs.gov/publication/sir20165114'>
                <img src={springsWaterQualityGraph2} alt='Springs Water Quality Graph 2' />
              </a>
            </>
          )}
          {indicator.title === 'Aquifer-storage change measured with microgravity' && (
            <>
              <a href='https://pubs.er.usgs.gov/publication/sir20165114'>
                <img src={aquiferStorageGraph1} alt='Aquifer-storage change measured with microgravity Graph 1' />
              </a>
              <a style={{ marginLeft: '15px' }} href='https://pubs.er.usgs.gov/publication/sir20165114'>
                <img src={aquiferStorageGraph2} alt='Aquifer-storage change measured with microgravity Graph 2' />
              </a>
            </>
          )}
          {indicator.title != 'San Pedro River water quality' &&
            indicator.title != 'Springs water quality' &&
            indicator.title != 'Aquifer-storage change measured with microgravity' && (
              <ReturnChart key={index} selectedIndicator={indicator} />
            )}
        </div>
      </div>
    ));
  } else {
    return chartData.map((indicator: IndicatorsConfigTypes, index: number) => {
      return indicator.title.includes('wet') ? (
        wetDryChart.length > 0 && (
          <WetDryChart chartData={wetDryChartData} indicatorTitle={indicator.title} containerWidth={containerWidth} />
        )
      ) : (
        <ReturnChart key={index} selectedIndicator={indicator} />
      );
    });
  }
};

export default ChartSelector;
