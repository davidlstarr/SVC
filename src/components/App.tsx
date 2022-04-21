import Map from './Map/Map';
import SideNav from './SideNav/SideNav';
import DatasetTable from './DatasetTable/DatasetTable';
import platform from 'platform';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import './print.scss';
import Box from '@mui/material/Box';
import 'remixicon/fonts/remixicon.css';
import InformationalPortalModal from './InformationalPortalModal/InformationalPortalModal';
import ExploreAnalyzePanel from './SidePanels/ExploreAnalyzePanel/ExploreAnalyzePanel';
import { activePageState } from '../store/slices/activePageSlice';
import { useSelector, useDispatch } from 'react-redux';
import ItemsToDownload from './ItemsToDownload/ItemsToDownload';
import { exploreDownloadDataState, itemsToDownloadState, pdfDownloadState } from '../store/slices/downloadsSlice';
import Loader from './loader/Loader';
import { loadingState } from '../store/slices/loadingSlice';
import 'react-toastify/dist/ReactToastify.css';
import { activeExplorePanelSelector } from '../store/slices/explorePanelSlice';
import {
  collapseSidePanelState,
  setCollapseSidePanel,
  setSmallDevicesWidth,
  smallDevicesWidthState,
} from '../store/slices/appSlice';
import Charts from './Charts/Charts';
import { useEffect } from 'react';
import { fullWidthChartsState, setFullWidthCharts } from '../store/slices/chartSlice';
import MapIcon from './MapIcon/MapIcon';
import Report from './ExportReport/Report';
import Popup from './Map/Popup/Popup';

const App = () => {
  const activePage = useSelector(activePageState);
  const itemsToDownload = useSelector(itemsToDownloadState);
  const activeExplorePanel = useSelector(activeExplorePanelSelector);
  const collapseSidePanel = useSelector(collapseSidePanelState);
  const fullWidthCharts = useSelector(fullWidthChartsState);
  const loading = useSelector(loadingState);
  const smallDevicesWidth = useSelector(smallDevicesWidthState);
  const pdfDownload = useSelector(pdfDownloadState);
  const dispatch = useDispatch();

  useEffect(() => {
    const width = document.querySelector('.app-container')?.clientWidth;
    // check for devices smaller then 1580 when page loads for the first time
    if (width && width <= 1580) {
      dispatch(setSmallDevicesWidth(width));
    }
  }, []);

  const exploreDownloadData = useSelector(exploreDownloadDataState);
  const handleCollapse = () => {
    dispatch(setCollapseSidePanel(!collapseSidePanel));
  };

  const handleCollapseChartPanel = () => {
    dispatch(setFullWidthCharts(!fullWidthCharts));
  };

  return (
    <>
      <Box className={`app-container ${platform.os?.family?.toLocaleLowerCase().includes('windows') ? 'windows' : ''}`}>
        <div className={!collapseSidePanel ? 'side-panel-container active' : 'side-panel-container'}>
          <SideNav />
          <ExploreAnalyzePanel />
        </div>
        {/* A Charts component for small devices only and one for desktops */}
        {activeExplorePanel === 3 && !fullWidthCharts && smallDevicesWidth && <Charts />}
        {activeExplorePanel === 3 && !smallDevicesWidth && <Charts />}

        <button className={!collapseSidePanel ? 'side-panel-icon active' : 'side-panel-icon'} onClick={handleCollapse}>
          <span
            aria-hidden='true'
            className='esri-collapse__icon esri-expand__icon--expanded esri-icon-collapse'
          ></span>
        </button>

        {smallDevicesWidth && activeExplorePanel === 3 && (
          <MapIcon
            fullWidthCharts={fullWidthCharts}
            handleCollapseChartPanel={handleCollapseChartPanel}
            className='main-map-icon'
          />
        )}
        <Box
          component='main'
          className='content-container'
          id={activePage === 'download-data' ? 'download-container' : ''}
        >
          {/* Similar to Charts but here we need an extra one when user wants to toggle between map and charts
      for small devices
       */}
          {/*{activePage === 'explore-data' && smallDevicesWidth && !fullWidthCharts && <Map />}
          {activePage === 'explore-data' && smallDevicesWidth && fullWidthCharts && <Map />}*/}
          {activePage === 'explore-data' && <Map />}
          <Popup />
          {activePage === 'download-data' && <DatasetTable />}
          {activePage === 'download-data' && !!itemsToDownload.length && <ItemsToDownload />}
          {!!itemsToDownload.length && !exploreDownloadData && <ItemsToDownload />}
          {exploreDownloadData && <ItemsToDownload exploreDownloadData={exploreDownloadData} />}
        </Box>
        <InformationalPortalModal />
        <ToastContainer />
        {loading && <Loader />}
      </Box>
      {pdfDownload && <Report />}
    </>
  );
};

export default App;
