import ScaleLoader from 'react-spinners/ScaleLoader';
import { useSelector } from 'react-redux';
import { loadingState } from '../../store/slices/loadingSlice';
import './loader.scss';

const Loader = () => {
  const loading = useSelector(loadingState);
  return (
    <div className='loader'>
      <ScaleLoader loading={loading} color='#2372b3' width={30} height={70} />
    </div>
  );
};

export default Loader;
