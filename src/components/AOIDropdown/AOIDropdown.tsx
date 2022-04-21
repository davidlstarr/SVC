import { useState, useEffect } from 'react';
import './AOIDropdown.scss';
import Select from 'react-select';
import { AOILayersConfig } from '../../configs/AOILayers.config';
import MapController from '../../controllers/MapController';
import UploadShapefileController from '../../controllers/UploadShapefileController';
import { setSingleSelectedDataSet } from '../../store/slices/featureLayerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAOILabel, clearSelectionState, setClearSelection, AOILabelState } from '../../store/slices/AOIFeatureSlice';
import aoiController from '../../controllers/AOIController';
import mapController from '../../controllers/MapController';

const AOIDropdown = () => {
  const [active, setActive] = useState('');
  const [AOIValues, setAOIValues] = useState([]);
  const [uploadedFile, setUploadedFile] = useState('');
  const dispatch = useDispatch();
  const clearSelectionButton = useSelector(clearSelectionState);
  const AOILabel = useSelector(AOILabelState);

  const handleAreaOfInterest = (value: any) => {
    dispatch(setClearSelection(true));
    dispatch(setAOILabel(value.label));
    setAOIValues(value);
    MapController._featureLayer?.destroy();
    dispatch(setSingleSelectedDataSet([]));
    mapController.clearMapView();
    aoiController.addAOIPolygon(value);
  };
  const clearSelection = () => {
    setAOIValues([]);
    setActive('');
    aoiController.clearSelection();
  };
  const drawAOIShape = () => {
    setActive('btn-active');
    dispatch(setClearSelection(true));
    aoiController.drawAOIShape();
  };
  const onShapefileChange = (event: any) => {
    if (event) {
      setActive('upload-label label-active');
      dispatch(setClearSelection(true));
      setUploadedFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    UploadShapefileController.shapefileUpload(uploadedFile);
  }, [uploadedFile]);

  return (
    <>
      {!clearSelectionButton && (
        <div className='explore-analyze-panel-dropdown'>
          <Select
            className='select-explore'
            isSearchable
            value={AOIValues}
            options={AOILayersConfig}
            onChange={handleAreaOfInterest}
            placeholder={AOILabel ? AOILabel : 'Select Area of Interest'}
          />
        </div>
      )}

      <div className='add-area-buttons'>
        <div className='visible-buttons'>
          <button onClick={drawAOIShape} className={active.includes('btn') ? active : ''}>
            draw shape
          </button>
          <>
            <input
              type='file'
              id='upload'
              accept='.zip'
              onChange={onShapefileChange}
              onClick={(e: any) => (e.target.value = null)}
              hidden
            />
            <label className={active.includes('label') ? active : 'upload-label'} htmlFor='upload'>
              Upload shape
            </label>
          </>
        </div>
        {clearSelectionButton && (
          <button className='clear-selection-btn' onClick={clearSelection}>
            clear selection
          </button>
        )}
      </div>
    </>
  );
};

export default AOIDropdown;
