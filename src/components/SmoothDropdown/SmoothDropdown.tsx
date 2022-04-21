import { useDispatch, useSelector } from 'react-redux';
import SmoothCollapse from 'react-smooth-collapse';
import {
  downloadDataIndicatorsState,
  layersDataCopyState,
  selectedDataSetsState,
  setCheckedIndicators,
  setDownloadDataIndicators,
  setLayersDataCopy,
  setMultipleSelectedDataSets,
  setSingleSelectedDataSet,
  setUpdateDownloadDataIndicators,
} from '../../store/slices/featureLayerSlice';
import mapController from '../../controllers/MapController';
import { IndicatorsConfigTypes, LayersConfigTypes } from '../../types/layerType';
import TooltipComponent from '../TooltipComponent/TooltipComponent';
import { activeExplorePanelSelector } from '../../store/slices/explorePanelSlice';
import { loadingState } from '../../store/slices/loadingSlice';
import './SmoothDropdown.scss';
import { setShowWetDryChart } from '../../store/slices/chartSlice';
import { activePageState } from '../../store/slices/activePageSlice';
import parse from 'html-react-parser';
import { csvDataToDownloadState, setUpdateCsvDataToDownload } from '../../store/slices/downloadsSlice';

const SmoothDropdown = () => {
  const layerDataCopy = useSelector(layersDataCopyState);
  const selectedDataSets = useSelector(selectedDataSetsState);
  const activeExplorePanel = useSelector(activeExplorePanelSelector);
  const loading = useSelector(loadingState);
  const activePage = useSelector(activePageState);
  const downloadDataIndicators = useSelector(downloadDataIndicatorsState);
  const csvDataToDownload = useSelector(csvDataToDownloadState);
  const dispatch = useDispatch();

  const handleDownloadDataIndicators = (target: any, layer: IndicatorsConfigTypes) => {
    if (activePage === 'download-data') {
      if (target.checked) {
        dispatch(setDownloadDataIndicators({ ...layer }));
      } else {
        const filterDatasets = downloadDataIndicators.filter((value: any) => value.id !== layer.id);
        const filterDataToDownload = csvDataToDownload.filter((value: any) => value.title !== layer.title);
        dispatch(setUpdateCsvDataToDownload(filterDataToDownload));
        dispatch(setUpdateDownloadDataIndicators(filterDatasets));
      }
    }
  };

  const handleDataset = (target: any, layer: IndicatorsConfigTypes) => {
    if (activeExplorePanel === 1) {
      const filterDatasets = selectedDataSets.filter((value: IndicatorsConfigTypes) => value.id !== layer.id);

      target.checked
        ? dispatch(setMultipleSelectedDataSets(layer))
        : dispatch(setSingleSelectedDataSet(filterDatasets));
    }
  };

  const checkDataset = (event: any, layer: IndicatorsConfigTypes) => {
    const { checked, id, attributes } = event.target;
    const title = attributes['data-name']['textContent'];

    if (checked && title === 'June wet-dry status') {
      dispatch(setShowWetDryChart(true));
    }
    if (!checked && title === 'June wet-dry status') {
      dispatch(setShowWetDryChart(false));
    }

    if (activeExplorePanel === 1 && activePage === 'explore-data') {
      mapController.setSelectedDataset(id, checked, layer);
    }

    handleDataset(event.target, layer);
    handleDownloadDataIndicators(event.target, layer);

    const updateLayerData = layerDataCopy.map((data: LayersConfigTypes) => {
      return {
        ...data,
        indicators: data.indicators.map((indicator: IndicatorsConfigTypes) => {
          if (indicator.id === id) {
            return {
              ...indicator,
              checked: checked,
            };
          }
          return indicator;
        }),
      };
    });
    layerDataCopy.map((data: LayersConfigTypes) => {
      data.indicators.map((indicator: IndicatorsConfigTypes) => {
        if (indicator.id === id) {
          dispatch(
            setCheckedIndicators({
              ...indicator,
              checked: checked,
            })
          );
        }
      });
    });
    dispatch(setLayersDataCopy(updateLayerData));
  };

  const handleOpenDropdown = (layer: LayersConfigTypes, event: any) => {
    const className = event.target.className;
    if (className === 'ri-information-line' || className === 'tooltip-icon') return;

    const updateLayerData = layerDataCopy.map((data: LayersConfigTypes) => {
      if (layer.id === data.id) {
        return {
          ...data,
          open: !layer.open,
        };
      }
      return data;
    });
    dispatch(setLayersDataCopy(updateLayerData));
  };

  const getLayerNames = (indicators: IndicatorsConfigTypes[]) => {
    return indicators.map((layer: IndicatorsConfigTypes, index: number) => (
      <div className='smooth-collapse-content' key={index}>
        <label htmlFor=''>
          <input
            type='checkbox'
            value={layer.url}
            checked={layer.checked}
            disabled={!layer.url}
            data-name={layer.title}
            name='dataset-checkbox'
            id={layer.id}
            onChange={(event) => checkDataset(event, layer)}
          />
          <div className='label-text-wrapper'>
            <span>{layer.title}</span>
            <TooltipComponent data={layer} />
          </div>
        </label>
      </div>
    ));
  };

  return (
    <>
      {layerDataCopy.map((layer: LayersConfigTypes) => (
        <div className='smooth-collapse-container' key={layer.id}>
          <button className='toggle-dropdown-btn' onClick={(event) => handleOpenDropdown(layer, event)}>
            <div className='top-side'>
              <div className='left-side'>
                <span className='btn-text'>{layer.title}</span>
              </div>
              <div className='right-side'>
                <span className='arrow-icon'>
                  {layer.open ? <i className='ri-arrow-up-s-line'></i> : <i className='ri-arrow-down-s-line'></i>}
                </span>
              </div>
            </div>

            <span className='description'>{parse(layer.description)}</span>
          </button>
          <div className='smooth-collapse-dropdown'>
            <SmoothCollapse expanded={layer.open}>{getLayerNames(layer.indicators)}</SmoothCollapse>
          </div>
        </div>
      ))}
      {!layerDataCopy.length && !loading && <h3 className='no-results'>No Results found</h3>}
    </>
  );
};

export default SmoothDropdown;
