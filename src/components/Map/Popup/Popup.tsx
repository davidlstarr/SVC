import React, { useState } from 'react';
import {
  DataGrid,
  GridRowModel,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import './Popup.scss';
import { useDispatch, useSelector } from 'react-redux';
import { popupFeaturesState, setPopupFeatures } from '../../../store/slices/appSlice';
import mapController from '../../../controllers/MapController';

const Popup = () => {
  const popupFeatures = useSelector(popupFeaturesState);
  const [selectedFeatureTable, setSelectedFeatureTable] = useState([]);
  const selectedFeature = mapController._mapview?.popup.selectedFeature?.attributes;
  const selectedFeatureId = mapController._mapview?.popup.selectedFeature?.attributes.ObjectId;
  const selectedFeatureTitle = mapController._mapview?.popup.selectedFeature?.layer.title;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const popupTemplate = mapController._mapview?.popup.selectedFeature?.layer.popupTemplate;
  const dispatch = useDispatch();

  let featureColumns: any = [];
  const getPopupFeatureKeys = () => {
    featureColumns = [];
    if (popupFeatures.length > 0) {
      if (popupTemplate.content != '') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return popupTemplate.content[0].fieldInfos.forEach((info: any) => {
          featureColumns.push({ field: info.fieldName, headerName: info.fieldName, width: 220 });
        });
      } else {
        dispatch(setPopupFeatures([]));
      }
    }
  };
  getPopupFeatureKeys();
  const sortFeatures = popupFeatures
    ?.map((data: any) => data)

    .map((data: any) => {
      for (const i in data.attributes) {
        if (
          i.includes('timestamp') ||
          i.includes('datetime') ||
          i.includes('measurement_dt') ||
          i.includes('sample_timestamp') ||
          i.includes('lev_timestamp_A')
        ) {
          data.attributes[i] = new Date(data.attributes[i]);
        }
      }
      return data;
    })
    ?.sort((a: any, b: any) => {
      const timestampFieldName = a.layer.fields.map((field: any) => {
        if (field.type === 'date') {
          return field.name;
        }
      });
      return (
        b.attributes[timestampFieldName.filter((data: any) => data !== undefined)] -
        a.attributes[timestampFieldName.filter((data: any) => data !== undefined)]
      );
    });
  const getSelectedRows = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setSelectedFeatureTable([selectedFeature]);
  };
  const getAllRows = () => {
    setSelectedFeatureTable([]);
  };
  const closePopup = () => {
    dispatch(setPopupFeatures([]));
  };

  const customToolbar = () => {
    return (
      <GridToolbarContainer>
        <div style={{ marginRight: 20 }}>{selectedFeatureTitle}</div>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        {selectedFeatureTable.length > 0 ? (
          <button
            onClick={getAllRows}
            className='selection-btn MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButtonBase-root  css-1knaqv7-MuiButtonBase-root-MuiButton-root'
            type='button'
            aria-label='Export'
            aria-haspopup='menu'
            aria-labelledby='mui-40'
            id='mui-39'
          >
            <i className='ri-table-fill'></i> &nbsp;&nbsp;Show All Rows
          </button>
        ) : (
          <button
            onClick={getSelectedRows}
            className='selection-btn MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButtonBase-root  css-1knaqv7-MuiButtonBase-root-MuiButton-root'
            type='button'
            aria-label='Export'
            aria-haspopup='menu'
            aria-labelledby='mui-40'
            id='mui-39'
          >
            <i className='ri-table-fill'></i> &nbsp;&nbsp;Show Selected Rows
          </button>
        )}
        <div className='close-btn' style={{ marginLeft: 'auto' }} onClick={closePopup}>
          <i className='ri-close-line' style={{ color: '#1976D2', fontSize: 18 }}></i>
        </div>
      </GridToolbarContainer>
    );
  };

  return (
    <div className={popupFeatures.length > 0 ? 'popup active' : 'popup'}>
      <DataGrid
        rows={
          popupFeatures.length > 0 && selectedFeatureTable.length > 0
            ? selectedFeatureTable
            : sortFeatures.map((data: any) => data.attributes)
        }
        columns={featureColumns}
        pageSize={40}
        rowsPerPageOptions={[5]}
        getRowId={(row: GridRowModel) => row.ObjectId | row.FID | row.OBJECTID}
        selectionModel={[selectedFeatureId]}
        disableSelectionOnClick
        components={{
          Toolbar: customToolbar,
        }}
        density={'compact'}
      />
    </div>
  );
};

export default Popup;
