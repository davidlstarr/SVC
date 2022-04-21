import './DatasetTable.scss';
import TableController from '../../controllers/TableController';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downloadDataIndicatorsState, stepOneDefaultValues } from '../../store/slices/featureLayerSlice';
import { setUpdateItemsToDownload } from '../../store/slices/downloadsSlice';

const DatasetTable = () => {
  const tableViewRef = useRef(null);
  const downloadDataIndicators = useSelector(downloadDataIndicatorsState);
  const [dataForTable, setDataForTable] = useState(stepOneDefaultValues);
  const dispatch = useDispatch();

  useEffect(() => {
    if (downloadDataIndicators.length) {
      const lastIndicator = downloadDataIndicators.slice(-1)[0];
      if (lastIndicator) {
        setDataForTable(lastIndicator);
      }
    } else {
      TableController.resetTable();
      dispatch(setUpdateItemsToDownload([]));
      setDataForTable(stepOneDefaultValues);
    }
  }, [downloadDataIndicators]);

  useEffect(() => {
    if (dataForTable.id) {
      TableController.initializeTableController(tableViewRef, dataForTable.title, dataForTable.url);
    }
  }, [dataForTable]);

  const handleAddToDownloads = () => {
    dispatch(setUpdateItemsToDownload(downloadDataIndicators));
  };

  const NoDataSelected = () => {
    return (
      <div className='no-data-selected'>
        <span>
          <i className='ri-information-line'></i>
        </span>
        <h3>no data selected</h3>
      </div>
    );
  };

  return (
    <div className='container' ref={tableViewRef} key={dataForTable.id}>
      {!dataForTable.id && <NoDataSelected />}
      {dataForTable && dataForTable.id && (
        <>
          <div id='dataset-table'>
            <div className='title'>{dataForTable.title}</div>

            <div className='url'>
              <a href={dataForTable.url} target='_blank' rel='noreferrer'>
                Data Source Url <i className='ri-share-box-fill'></i>
              </a>
            </div>
          </div>
          <div className='add-to-download-btn'>
            <button onClick={handleAddToDownloads}>+ add to downloads</button>
          </div>
        </>
      )}
    </div>
  );
};

export default DatasetTable;
