import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SmoothCollapse from 'react-smooth-collapse';
import {
  allFeaturesDownloadedState,
  csvDataToDownloadState,
  downloadAllState,
  itemsToDownloadState,
  setDownloadAll,
  setExploreDownloadData,
  setUpdateItemsToDownload,
} from '../../store/slices/downloadsSlice';
import ConfirmDownload from '../ConfirmDownload/ConfirmDownload';
import DataDownloadController from '../../controllers/DataDownloadController';
import './itemsToDownload.scss';

export interface ValueTypes {
  email: string;
  terms: boolean;
}

const defaultValues = { email: '', terms: false };

const ItemsToDownload = (props: any) => {
  const { exploreDownloadData } = props;
  const [open, setOpen] = useState(false);
  const [confirmDownloadData, setConfirmDownloadData] = useState<ValueTypes>(defaultValues);
  const itemsToDownload = useSelector(itemsToDownloadState);
  const csvDataToDownload = useSelector(csvDataToDownloadState);
  const downloadAll = useSelector(downloadAllState);
  const allFeaturesDownloaded = useSelector(allFeaturesDownloadedState);
  const dispatch = useDispatch();

  const handleToggleItemSelected = () => {
    setOpen(!open);
  };

  const handleRemoveItemSelected = (id: string) => {
    const removeItem = itemsToDownload.filter((item: any) => item.id !== id);
    dispatch(setUpdateItemsToDownload(removeItem));
  };

  const handleDownloadAll = (event: any) => {
    const downloadBtn = event.target.className;
    if (downloadBtn !== 'download-all-btn') {
      event.stopPropagation();
    }
    dispatch(setDownloadAll(true));
  };

  const handleCancelDownload = () => {
    dispatch(setDownloadAll(false));
    dispatch(setExploreDownloadData(false));
    setConfirmDownloadData(defaultValues);
  };

  const handleDownloadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setOpen(false);
    dispatch(setExploreDownloadData(false));
    setConfirmDownloadData(defaultValues);
    DataDownloadController.handleDownloadSubmit(event, csvDataToDownload, confirmDownloadData);
  };

  return (
    <div className={exploreDownloadData ? 'ItemsToDownload exploreItemsToDownload' : 'ItemsToDownload'}>
      {!downloadAll && !exploreDownloadData && (
        <>
          <div className='items-selected-btn-wrapper'>
            <div className='items-selected-btn' onClick={handleToggleItemSelected}>
              {`(${itemsToDownload.length}) Items Selected `}
              <button className='download-all-btn' onClick={handleDownloadAll} disabled={!allFeaturesDownloaded}>
                {allFeaturesDownloaded ? 'download all' : 'downloading...'}
              </button>
            </div>
          </div>
          <SmoothCollapse expanded={open}>
            <div className='smooth-collapse-content'>
              {itemsToDownload.map((item: any) => (
                <div className='selected-item' key={item.id}>
                  <p>{item.title}</p>
                  <button onClick={() => handleRemoveItemSelected(item.id)} className='remove-icon'>
                    {allFeaturesDownloaded ? <i className='ri-close-circle-line'></i> : <p> Downloading...</p>}
                  </button>
                </div>
              ))}
            </div>
          </SmoothCollapse>
        </>
      )}

      {downloadAll && (
        <ConfirmDownload
          confirmDownloadData={confirmDownloadData}
          handleDownloadSubmit={handleDownloadSubmit}
          setConfirmDownloadData={setConfirmDownloadData}
          handleCancelDownload={handleCancelDownload}
        />
      )}
    </div>
  );
};

export default ItemsToDownload;
