import SmoothDropdown from '../SmoothDropdown/SmoothDropdown';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkedIndicatorsState,
  downloadDataIndicatorsState,
  layersDataCopyState,
  layersDataState,
  selectedDataSetsState,
  setLayersDataCopy,
  setSingleSelectedDataSet,
  setStepOneSelectedDataSet,
  setUpdateDownloadDataIndicators,
  stepOneDefaultValues,
} from '../../store/slices/featureLayerSlice';
import mapController from '../../controllers/MapController';
import { IndicatorsConfigTypes, LayersConfigTypes } from '../../types/layerType';
import {
  activeExplorePanelSelector,
  activeSearchValueSelector,
  setSearchValue,
} from '../../store/slices/explorePanelSlice';
import './SearchDatasets.scss';
import { setShowWetDryChart } from '../../store/slices/chartSlice';
import SearchIndicator from '../SearchIndicator/SearchIndicator';
import { activePageState } from '../../store/slices/activePageSlice';
import SelectedIndicators from '../SelectedIndicators/SelectedIndicators';

const SearchDatasets = () => {
  const selectedDataSets = useSelector(selectedDataSetsState);
  const activeExplorePanel = useSelector(activeExplorePanelSelector);
  const layerData = useSelector(layersDataState);
  const layerDataCopy = useSelector(layersDataCopyState);
  const downloadDataIndicators = useSelector(downloadDataIndicatorsState);
  const activePage = useSelector(activePageState);
  const searchValue = useSelector(activeSearchValueSelector);
  const checkedIndicators = useSelector(checkedIndicatorsState);
  const dispatch = useDispatch();

  const handleWhichDataToFilter = (dataToFilter: IndicatorsConfigTypes[], dataset: IndicatorsConfigTypes) => {
    return dataToFilter.filter((value) => value.id !== dataset.id);
  };

  const handleRemoveDataset = (dataset: IndicatorsConfigTypes, step: 1 | 2 | null) => {
    const isExploreDataActive = activePage === 'explore-data';

    if (dataset.title === 'June wet-dry status') {
      dispatch(setShowWetDryChart(false));
    }
    if (step === 1 && isExploreDataActive) {
      mapController.setSelectedDataset(dataset.id, false, dataset);
      dispatch(setStepOneSelectedDataSet(stepOneDefaultValues));
    }

    const dataToFilter = isExploreDataActive && step === 1 ? selectedDataSets : downloadDataIndicators;
    const filterDatasets = handleWhichDataToFilter(dataToFilter, dataset);

    const updateLayerData = layerDataCopy.map((data: LayersConfigTypes) => {
      return {
        ...data,
        indicators: data.indicators.map((indicator: IndicatorsConfigTypes) => {
          if (indicator.id === dataset.id) {
            return {
              ...indicator,
              checked: false,
            };
          }
          return indicator;
        }),
      };
    });

    isExploreDataActive
      ? dispatch(setSingleSelectedDataSet(filterDatasets))
      : dispatch(setUpdateDownloadDataIndicators(filterDatasets));
    dispatch(setLayersDataCopy(updateLayerData));
  };

  // filter data by indicator title as user is typing
  const handleSearchIndicators = (event: any) => {
    const value = event.target.value;
    // filter Layer data
    dispatch(setSearchValue(value));
    const updateLayersData = layerData.filter((data: LayersConfigTypes) =>
      data.indicators.some((indicator: IndicatorsConfigTypes) =>
        indicator.title.toLowerCase().includes(value.toLowerCase())
      )
    );
    // filter indicators from filtered layer data
    const filterIndicators = updateLayersData.map((data: LayersConfigTypes) => {
      //maps indicators that are checked after searching
      const indicatorCheckAfterSearch = data.indicators.map((indicator: IndicatorsConfigTypes) => {
        return {
          ...indicator,
          checked: checkedIndicators.some((checked: IndicatorsConfigTypes) => indicator.id === checked.id),
        };
      });

      return {
        ...data,
        indicators:
          checkedIndicators.length > 0
            ? indicatorCheckAfterSearch
            : data.indicators.filter((indicator: IndicatorsConfigTypes) =>
                indicator.title.toLowerCase().includes(value.toLowerCase())
              ),
      };
    });
    dispatch(setLayersDataCopy(filterIndicators));
  };

  return (
    <div>
      <SearchIndicator searchValue={searchValue} handleSearchIndicators={handleSearchIndicators} />

      <div className='selected-datasets-container'>
        {!!selectedDataSets.length && activeExplorePanel === 1 && activePage === 'explore-data' && (
          <SelectedIndicators
            selectedIndicators={selectedDataSets}
            step={1}
            handleRemoveDataset={handleRemoveDataset}
          />
        )}

        {!!downloadDataIndicators.length && activePage === 'download-data' && (
          <SelectedIndicators
            selectedIndicators={downloadDataIndicators}
            step={null}
            handleRemoveDataset={handleRemoveDataset}
          />
        )}
      </div>
      <SmoothDropdown />
    </div>
  );
};

export default SearchDatasets;
