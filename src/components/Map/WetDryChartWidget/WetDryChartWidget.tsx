import SmoothCollapse from 'react-smooth-collapse';
import { useDispatch, useSelector } from 'react-redux';
import { loadingState, setLoading } from '../../../store/slices/loadingSlice';
import Select from 'react-select';
import wetDryIcon from '../../../assets/wet-dry-icon.svg';
import selectYearIcon from '../../../assets/select-year-wet-dry.svg';
import WetDryChart from '../../WetDryChart/WetDryChart';
import {
  chartDataState,
  filterOptionsState,
  FilterTypes,
  openChartWidgetState,
  setOpenChartWidget,
  setYear,
  yearState,
} from '../../../store/slices/chartSlice';
import './WetDryChartWidget.scss';
import TooltipComponent from '../../TooltipComponent/TooltipComponent';
import config from '../../../configs';
import wetDryController from '../../../controllers/wetDryController';
import timeSliderController from '../../../controllers/timeSliderController';

export interface AttributeTypes {
  Year: number;
  FMEAS?: number;
  TMEAS?: number;
  FMEAS_mile: number;
  TMEAS_mile: number;
  FID: number;
}

const WetDryChartWidget = () => {
  const filterOptions = useSelector(filterOptionsState);
  const openChartWidget = useSelector(openChartWidgetState);
  const chartData = useSelector(chartDataState);
  const loading = useSelector(loadingState);
  const year = useSelector(yearState);
  const dispatch = useDispatch();

  const handleOpenDropdown = () => {
    dispatch(setOpenChartWidget(!openChartWidget));
  };

  const handleChangeYear = async (value: FilterTypes) => {
    dispatch(setLoading(true));
    const attributes = await wetDryController.getWetDryData(value.label);

    if (attributes && !!attributes.length) {
      dispatch(setLoading(false));
      wetDryController.structureWetDryChartData(value.label, attributes);
    }
    dispatch(setYear(value));
    if (value.label === 'All') {
      timeSliderController.updateTimeSliderValues('2020', true);
    } else {
      timeSliderController.updateTimeSliderValues(value.label, false);
    }
  };

  const tooltipData = { indicators: null, tooltipDescription: config.wetdryTooltipDescription };

  const SelectYear = () => {
    return (
      <div className='SelectYear'>
        <Select
          isMulti={false}
          className='select-year'
          value={year}
          isDisabled={loading}
          options={filterOptions}
          onChange={handleChangeYear}
          placeholder='Select Year'
        />
      </div>
    );
  };

  return (
    <div className={openChartWidget ? 'show-chart WetDryChartWidget' : 'WetDryChartWidget'}>
      <div className='widget-wrapper'>
        <div className='left-side'>
          <h3>
            Wet/Dry Chart
            <TooltipComponent data={tooltipData} fullWidth={true} />
          </h3>

          {!openChartWidget && <img src={wetDryIcon} alt='Wet/Dry chart icon' />}
          {openChartWidget && <SelectYear />}
        </div>
        <div className='btn-wrapper'>
          <button onClick={handleOpenDropdown} disabled={loading}>
            <span className='arrow-icon'>
              {openChartWidget ? <i className='ri-arrow-up-s-line'></i> : <i className='ri-arrow-down-s-line'></i>}
            </span>
          </button>
        </div>
      </div>
      <SmoothCollapse expanded={openChartWidget}>
        <div className='chart-dropdown-wrapper'>
          {!year?.label && !loading && (
            <div className='chart-icon'>
              <img src={selectYearIcon} alt='' />
            </div>
          )}
          {/* Only show chart when user has selected a year from dropdown and we have chart data ready and  */}
          {!!chartData.length && !loading && <WetDryChart chartData={chartData} />}
        </div>
      </SmoothCollapse>
    </div>
  );
};

export default WetDryChartWidget;
