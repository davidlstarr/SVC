import { useDispatch, useSelector } from 'react-redux';
import config from '../../../configs';
import { activeExplorePanelSelector, setActiveExplorePanel } from '../../../store/slices/explorePanelSlice';
import AOIDropdown from '../../AOIDropdown/AOIDropdown';
import SearchDatasets from '../../SearchDatasets/SearchDatasets';
import DatePickerComponent from '../../DatePickerComponent/DatePickerComponent';
import ExportPrintButtons from '../../ExportReport/ExportPrintButtons';
import { activePageState } from '../../../store/slices/activePageSlice';
import { displayMessage } from '../../../utils/displayMessage';
import { layersDataCopyState, selectedDataSetsState } from '../../../store/slices/featureLayerSlice';
import mapController from '../../../controllers/MapController';
import { chartProperties, IndicatorsConfigTypes } from '../../../types/layerType';
const { sidePanelConfig } = config;
import { FilterTypes, setChartType, setFilterOptions } from '../../../store/slices/chartSlice';
import { useEffect, useState } from 'react';
import { getAllYears } from '../../../utils/fetchChartData';
import './ExploreAnalyzePanel.scss';
import { activeEndDateState, activeStartDateState, setMapImage } from '../../../store/slices/appSlice';
import { setPdfDownload } from '../../../store/slices/downloadsSlice';
import printController from '../../../controllers/PrintController';
import parse from 'html-react-parser';
import dataDownloadController from '../../../controllers/DataDownloadController';

const ExploreAnalyzePanel = () => {
  const activePage = useSelector(activePageState);
  const activeExplorePanel = useSelector(activeExplorePanelSelector);
  const selectedLayerData = useSelector(layersDataCopyState);
  const startDate = useSelector(activeStartDateState);
  const endDate = useSelector(activeEndDateState);
  const [indicatorSelected, setIndicatorSelected] = useState(false);
  const [resetLegend, setResetLegend] = useState(false);
  const [dateInput, setDateInput] = useState(false);
  const dispatch = useDispatch();
  const selectedIndicators = useSelector(selectedDataSetsState);

  useEffect(() => {
    // get years data once page loads
    async function getData() {
      const getYearsData = await getAllYears();

      const updateYearsData = getYearsData
        ?.map((year: number) => {
          return {
            label: String(year),
            value: String(year),
          };
        })
        .sort((a: any, b: any) => a.label - b.label) as FilterTypes[];

      dispatch(setFilterOptions(updateYearsData));
    }
    getData();
  }, []);

  useEffect(() => {
    setDateInput(false);
    if (startDate != null && endDate != null && activeExplorePanel === 2) {
      const validateDates = startDate <= endDate;
      if (!validateDates) {
        displayMessage('Select a start date that is on or before the end date', 'error');
        setDateInput(false);
      } else {
        setDateInput(true);
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const selectedIndicator: any = selectedLayerData.map((data) =>
      data.indicators.some((indicator: any) => {
        return indicator.checked;
      })
    );
    setIndicatorSelected(selectedIndicator.includes(true));
  }, [selectedLayerData]);

  const handleNextStep = () => {
    const next = activeExplorePanel + 1;
    dispatch(setActiveExplorePanel(next));
    switch (activeExplorePanel) {
      case 1:
        mapController._mapview?.takeScreenshot().then((screenshot: any) => {
          dispatch(setMapImage(screenshot.dataUrl));
        });
        break;
      case 2:
        if (!resetLegend) {
          setResetLegend(true);
          printController.addLegendWidgetToMap();
        }
        dispatch(setPdfDownload(true));
        selectedIndicators.map((indicator: IndicatorsConfigTypes) => {
          indicator.chartProperties.map(async (properties: chartProperties) => {
            dataDownloadController.queryIndicatorByAOIAndTimeFrame(indicator, properties);
          });
        });
        break;
      default:
        return;
    }
  };

  const handlePreviousStep = () => {
    const previous = activeExplorePanel - 1;
    dispatch(setActiveExplorePanel(previous));
    if (activeExplorePanel === 2) {
      dispatch(setPdfDownload(false));
      dispatch(setChartType(false));
      setResetLegend(false);
    }
  };

  const RenderHeader = ({ item }: any) => {
    return (
      <div className='explore-analyze-panel-header'>
        <>
          <h1>{item.panel}</h1>
          <h3>
            {activePage === 'explore-data' && (
              <>
                <span className='panel-steps'>{item.step}</span>
                {item.title}
              </>
            )}
          </h3>
          <p>{parse(item.instructions)}</p>
        </>
      </div>
    );
  };

  const panelReturn = (className: string) => {
    switch (activeExplorePanel) {
      case 1: {
        return activePage === 'explore-data' ? (
          <>
            <RenderHeader item={sidePanelConfig[0]} />
            <div className={className}>
              {activePage === 'explore-data' && <AOIDropdown />}
              <SearchDatasets />
            </div>
          </>
        ) : (
          <>
            <RenderHeader item={sidePanelConfig[3]} />
            <div className={className}>
              <SearchDatasets />
            </div>
          </>
        );
      }

      case 2:
        return (
          <>
            <RenderHeader item={sidePanelConfig[1]} />
            <div className={className}>
              <DatePickerComponent />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <RenderHeader item={sidePanelConfig[2]} />
            <div className={className}>
              <ExportPrintButtons />
            </div>
          </>
        );
      default:
        return null;
    }
  };
  const ReturnNextButton = () => {
    switch (activeExplorePanel) {
      case 1:
        return (
          <button disabled={!indicatorSelected} className='next-btn' onClick={handleNextStep}>
            Next
          </button>
        );
      case 2:
        return (
          <button disabled={!dateInput} className='next-btn' onClick={handleNextStep}>
            Next
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className='ExploreAnalyzePanel'>
        {panelReturn('auto-height-container')}
        <div className={activeExplorePanel !== 1 ? 'space-between navigate-buttons' : 'navigate-buttons'}>
          {activeExplorePanel !== 1 && (
            <button className='back-btn' onClick={handlePreviousStep}>
              Back
            </button>
          )}
          {activePage === 'explore-data' && <ReturnNextButton />}
        </div>
      </div>
    </>
  );
};

export default ExploreAnalyzePanel;
