import ListItem from '@mui/material/ListItem';
import './ListItem.scss';
import { activePageState, setActivePage } from '../../store/slices/activePageSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLayersDataCopy,
  setStepOneSelectedDataSet,
  stepOneDefaultValues,
  setSingleSelectedDataSet,
} from '../../store/slices/featureLayerSlice';
import mapController from '../../controllers/MapController';
import TableController from '../../controllers/TableController';
import {
  setDownloadAll,
  setExploreDownloadData,
  setUpdateCsvDataToDownload,
  setUpdateItemsToDownload,
} from '../../store/slices/downloadsSlice';
import { setActiveExplorePanel } from '../../store/slices/explorePanelSlice';
import { setChartType } from '../../store/slices/chartSlice';
import aoiController from '../../controllers/AOIController';
import { setPopupFeatures, setTimeSliderWidget } from '../../store/slices/appSlice';
import timeSliderController from '../../controllers/timeSliderController';

const ListItems: any = () => {
  const listItem = [
    {
      name: 'Data Explorer',
      icon: 'ri-navigation-line',
      elementId: 'explore-data',
    },
    {
      name: 'Download Data',
      icon: 'ri-archive-line',
      elementId: 'download-data',
    },
    /*{
      name: 'Print',
      icon: 'ri-printer-line',
      elementId: 'print',
    },*/
    {
      name: 'Get Help',
      icon: 'ri-question-mark',
      elementId: 'question-mark',
    },
  ];
  const dispatch = useDispatch();
  const activePage = useSelector(activePageState);
  const getActivePage = (event: any) => {
    const page = event.target.id;
    if (page === 'explore-data') {
      dispatch(setStepOneSelectedDataSet(stepOneDefaultValues));
      dispatch(setSingleSelectedDataSet([]));
      dispatch(setUpdateItemsToDownload([]));
      TableController.resetTable();
      mapController.clearMapView();
      aoiController.clearSelection();
    }
    dispatch(setUpdateCsvDataToDownload([]));
    dispatch(setUpdateItemsToDownload([]));
    dispatch(setExploreDownloadData(false));
    dispatch(setDownloadAll(false));
    dispatch(setChartType(false));
    const resetLayerData = mapController.resetLayerData();
    dispatch(setLayersDataCopy(resetLayerData));
    dispatch(setActiveExplorePanel(1));
    dispatch(setActivePage(page));
    dispatch(setTimeSliderWidget(false));
    timeSliderController._timeSlider.destroy();
    dispatch(setPopupFeatures([]));
  };
  return listItem.map((item) =>
    item.elementId === 'question-mark' ? (
      <ListItem
        id={item.elementId}
        key={item.elementId}
        onClick={() => {
          window.open(
            'https://sierravista.maps.arcgis.com/sharing/rest/content/items/e0b4671b03a14aa3bbca052ecd7c63ef/data',
            '_blank'
          );
        }}
        className={activePage === item.elementId ? 'active-page' : ''}
      >
        <div className='icon' id={item.elementId}>
          <i className={item.icon}></i>
        </div>
        <span>{item.name}</span>
      </ListItem>
    ) : (
      <ListItem key={item.elementId} className={activePage == item.elementId ? 'active-page' : ''}>
        <div className='click-overlay' id={item.elementId} onClick={getActivePage}></div>
        <div className='icon' id={`${item.elementId}-icon`}>
          <i className={item.icon}></i>
        </div>
        <span>{item.name}</span>
      </ListItem>
    )
  );
};

export default ListItems;
