import { ValueTypes } from '../ItemsToDownload/ItemsToDownload';
import './ConfirmDownloads.scss';
import { useSelector } from 'react-redux';
import { allFeaturesDownloadedState } from '../../store/slices/downloadsSlice';

interface Props {
  confirmDownloadData: ValueTypes;
  handleDownloadSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setConfirmDownloadData: (value: ValueTypes) => void;
  handleCancelDownload: () => void;
}
const ConfirmDownload = ({
  confirmDownloadData,
  handleDownloadSubmit,
  setConfirmDownloadData,
  handleCancelDownload,
}: Props) => {
  const allFeaturesDownloaded = useSelector(allFeaturesDownloadedState);
  return (
    <div className='ConfirmDownlad'>
      <div className='confirm-download-header'>
        <h3>Confirm Download</h3>
        <p>Enter your email info below to complete your secure download</p>
      </div>
      <form onSubmit={handleDownloadSubmit}>
        <label htmlFor='email'>
          <input
            id='email'
            type='email'
            name='email'
            className='email'
            autoFocus={true}
            placeholder='Your email address'
            value={confirmDownloadData.email}
            onChange={(event) => setConfirmDownloadData({ ...confirmDownloadData, email: event.target.value })}
          />
        </label>
        <label htmlFor='terms' className='terms-label'>
          <input
            type='checkbox'
            id='terms'
            name='terms'
            checked={confirmDownloadData.terms}
            onChange={(event) => setConfirmDownloadData({ ...confirmDownloadData, terms: event.target.checked })}
          />
          <span>
            I would like to receive information related to the Web-based Hydrologic Information Portal for the Upper San
            Pedro Basin as it is available.
          </span>
        </label>
        <div className='btns-wrapper'>
          <button type='submit' disabled={!confirmDownloadData.email}>
            {allFeaturesDownloaded ? 'Submit' : 'Downloading...'}
          </button>
          <button type='button' onClick={handleCancelDownload}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmDownload;
