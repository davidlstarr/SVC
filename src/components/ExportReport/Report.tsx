import sanPedroLogo from '../../assets/modal-logo.png';
import { useSelector } from 'react-redux';
import { activeStartDateState, activeEndDateState, mapImageState } from '../../store/slices/appSlice';
import ChartSelector from '../Charts/ChartTypes/ChartSelector';

const Report = () => {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const startDate: any = useSelector(activeStartDateState);
  const endDate: any = useSelector(activeEndDateState);
  const mapImage: any = useSelector(mapImageState);

  return (
    <div className='report-container'>
      <div className='date-range'>
        {`${startDate.toLocaleDateString('en-US', dateOptions)} - ${endDate.toLocaleDateString('en-US', dateOptions)}`}
      </div>
      <img className='san-pedro-logo' src={sanPedroLogo} alt='San Pedro Logo' />
      <div className='indicator-container' id='header'>
        <div className='indicator-content'>
          <div id='legend-container' style={{ border: '1px solid #e2e2e2' }}></div>
        </div>
        <div className='map-chart-container'>
          <img className='map' src={mapImage} alt='' />
        </div>
      </div>
      <ChartSelector report />
    </div>
  );
};

export default Report;
