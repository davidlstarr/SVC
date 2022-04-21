import './ExportPrintButtons.scss';
import { useDispatch } from 'react-redux';
import { setDownloadAll, setExploreDownloadData } from '../../store/slices/downloadsSlice';

const ExportPrintButtons = () => {
  const dispatch = useDispatch();

  const handlePdfDownload = () => {
    window.print();
  };

  const handlePrintDownloadSubmit = () => {
    dispatch(setExploreDownloadData(true));
    dispatch(setDownloadAll(true));
    handlePdfDownload();
  };

  const handleDownload = () => {
    dispatch(setExploreDownloadData(true));
    dispatch(setDownloadAll(true));
  };

  return (
    <>
      <div className='ExportPrintButtons'>
        <div className='auto-height-container'>
          <div className='top-print-btns'>
            <button onClick={handlePdfDownload}>Save to Pdf</button>
            <button onClick={handleDownload}>download data</button>
          </div>
          <div className='bottom-print-btn'>
            <button onClick={handlePrintDownloadSubmit}>print & download</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportPrintButtons;
