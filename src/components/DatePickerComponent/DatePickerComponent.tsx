import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerComponent.scss';
import { useDispatch, useSelector } from 'react-redux';
import { activeStartDateState, setStartDate, activeEndDateState, setEndDate } from '../../store/slices/appSlice';

const DatePickerComponent: any = () => {
  const dispatch = useDispatch();
  const startDate: any = useSelector(activeStartDateState);
  const endDate: any = useSelector(activeEndDateState);

  return (
    <div className='DatePickerComponent'>
      <label htmlFor='startDate'>
        <span className='label-text'>Start Date</span>
        <DatePicker
          className='datepicker'
          placeholderText='Select a start date'
          selected={startDate}
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          minDate={new Date(1940, 1, 1)}
          maxDate={new Date()}
          onChange={(date: Date) => dispatch(setStartDate(date))}
        />
      </label>
      <label htmlFor='endDate'>
        <span className='label-text'>End Date</span>
        <DatePicker
          className='datepicker'
          placeholderText='Select an end date'
          selected={endDate}
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          minDate={new Date(1940, 1, 1)}
          maxDate={new Date()}
          onChange={(date: Date) => dispatch(setEndDate(date))}
        />
      </label>
    </div>
  );
};

export default DatePickerComponent;
