export const layersConfig = [
  {
    id: '12',
    label: '',
    title: 'Regional Groundwater',
    description:
      'Regional Groundwater Indicators provide evidence related to the condition of the ecosystem dependent upon the regional aquifer and enable tracking of how regional groundwater levels have changed or are trending over time.',
    open: false,
    indicators: [
      {
        id: '1',
        parentID: '12',
        label: 'indicatorOneRegionalWaterLevels',
        title: 'Regional-aquifer water levels',
        checked: false,
        tooltipDescription:
          'Groundwater levels below land surface measured in non-pumping wells across the Sierra Vista Subwatershed that are screened in the regional aquifer.',
        description:
          'When many regional-aquifer water level measurements are available through time, they can provide a broad overview of changes occurring in the aquifer due to pumping, changes in climate, changes in land use, or other factors. Water levels can steadily increase or decrease (depth to water below land surface steadily decreases or increases) or vary (depth to water below land surface increases and decreases but not steadily in one direction). Water levels rarely remain static, neither increasing nor decreasing; more commonly that indicates a plugged well and the water levels are no longer connected to the aquifer.',
        // count: 3859 
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/Indicator_1_Regional_aquifer_water_levels/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric', month: 'long', day: 'numeric' },
        chartType: ['LineChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'Depth, in feet',
            yAxisTitle: 'Depth, in feet',
            dataField: 'lev_va',
            siteNameField: 'name',
            timestampField: 'lev_timestamp',
            outFields: ['name', 'lev_va', 'lev_timestamp'],
            orderByFields: ['lev_timestamp'],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'Regional-aquifer water levels',
          outFields: ['*'],
          orderByFields: ['lev_timestamp'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'name',
                  label: 'Site Name',
                },
                {
                  fieldName: 'station_nm',
                  label: 'Station Number',
                },
                {
                  fieldName: 'site_no',
                  label: 'Site Number',
                },
                {
                  fieldName: 'lev_va',
                  label: 'Depth to Groundwater (feet)',
                },
                {
                  fieldName: 'sl_lev_va',
                  label: 'sl_lev_va',
                },
                {
                  fieldName: 'sl_datum_cd',
                  label: 'sl_datum_cd',
                },
                {
                  fieldName: 'relative_to_baseline',
                  label: 'Relative to Baseline',
                },
                {
                  fieldName: 'lev_timestamp',
                  label: 'Timestamp',
                },
              ],
            },
          ],
        },
        timeSlider: true,
        symbol: {
          type: 'unique-value',
          legendOptions: {
            title:
              'Note: Wells in green are above baseline, wells in red are below baseline, and those in grey are not actively monitored. The baseline is calculated by taking a 7-year average from the quarterly value.',
          },
          field: 'relative_to_baseline',
          uniqueValueInfos: [
            {
              value: 'Greater',
              label: 'Deeper',
              symbol: {
                type: 'simple-marker',
                color: '#fd0026',
                style: 'triangle',
                size: 8,
              },
            },
            {
              value: 'Less',
              label: 'Shallower',
              symbol: {
                type: 'simple-marker',
                color: '#30f603',
                style: 'triangle',
                size: 8,
              },
            },
            // {
            //   value: 'Other',
            //   label: 'Other',
            //   symbol: {
            //     type: 'simple-marker',
            //     color: '#e2e2e2',
            //     style: 'triangle',
            //     size: 8,
            //   },
            // },
          ],
        },
      },
      {
        id: '2',
        parentID: '12',
        label: 'indicatorElevenSanPedroWaterQuality',
        title: 'Horizontal hydraulic gradients (regional-aquifer wells)',
        checked: false,
        tooltipDescription:
          'The difference in groundwater elevation (relative to sea level) as a function of distance from one regional-aquifer well to another along a transect of 2 or more wells.',
        description:
          'The change in horizontal gradient can be calculated between wells that are at different distances from an area of groundwater discharge (for example, a stream channel). A negative value in the horizontal gradient indicates that the water-level elevation is lower at well A, near the pumping center, than it is at a well B, closer to the basin center (the area of groundwater discharge). A positive value indicates the opposite. Areas with negative horizontal-gradient values would be interpreted as flowing toward the pumping center, rather than toward the riparian area and river. Areas with declining (but not necessarily negative) horizontal gradients would be interpreted as seeing a reduction in the tendency of groundwater to flow toward the river in addition to that resulting from general reductions in groundwater levels (indicating a reduced volume of water flowing toward the river). Areas of increasing horizontal gradients would be interpreted as seeing an additional increase in the tendency of groundwater to flow toward the river.',
        // count: 790
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/Indicator_2_Horizontal_gradients/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'OBJECTID',
        definitionExpression: null,
        dateOptions: { year: 'numeric', month: 'long', day: 'numeric' },
        chartType: ['LineChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'Dimensionless',
            yAxisTitle: '',
            dataField: 'horiz_gradient',
            siteNameField: 'group_',
            timestampField: 'lev_timestamp_A',
            outFields: ['group_', 'horiz_gradient', 'lev_timestamp_A'],
            orderByFields: ['lev_timestamp_A'],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'Horizontal hydraulic gradients (regional-aquifer wells)',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'group_',
                  label: 'Group Name',
                },
                {
                  fieldName: 'horiz_gradient',
                  label: 'Horizontal Gradient (feet)',
                  format: {
                    places: 5,
                  }
                },
                {
                  fieldName: 'relative_to_baseline',
                  label: 'Relative to Baseline',
                },
                {
                  fieldName: 'lev_timestamp_A',
                  label: 'Timestamp',
                },
              ],
            },
          ],
        },
        timeSlider: true,
        symbol: {
          type: 'unique-value',
          legendOptions: {
            title: 'Note: Relative to baseline (mean of more recent 7 years)',
          },
          field: 'relative_to_baseline',
          uniqueValueInfos: [
            {
              value: 'Greater',
              label: 'Greater',
              symbol: {
                type: 'simple-line',
                color: '#52fd00',
                width: 2,
              },
            },
            {
              value: 'Less',
              label: 'Lesser',
              symbol: {
                type: 'simple-line',
                color: '#f60303',
                width: 2,
              },
            },
            {
              value: 'Other',
              label: 'Other',
              symbol: {
                type: 'simple-line',
                color: '#e2e2e2',
                width: 2,
              },
            },
          ],
        },
      },
      {
        id: '3',
        parentID: '12',
        label: '',
        title: 'Aquifer-storage change measured with microgravity',
        checked: false,
        tooltipDescription:
          'A way to directly determine changes in aquifer storage by using a gravity meter to measure the changes in the acceleration due to gravity brought on by changes in the mass—resulting from changes in the water stored—in the aquifer. Microgravity can also be used to estimate the difficult-to-determine aquifer property specific yield.',
        description:
          'When water increases or decreases in an aquifer, there is a change in mass. When there is greater mass underground (i.e., there is more water), the acceleration due to gravity is greater than when there is less mass (i.e., there is less water). The difference in gravitational acceleration that results from changes in the amount of water present in an aquifer can be measured using a gravity meter, and the change in gravity can be converted to the change of water present in the aquifer (the aquifer storage).\n' +
          'Small changes in the acceleration due to gravity, measured at the land surface, are directly related to the total change in water stored in an aquifer, expressed as the height of a slab of free-standing water. When these changes in storage appear to be related to nearby changes in water levels in wells, we obtain information about how much water is gained or lost from aquifer storage for a given increase or decrease in water level (specific yield). It is also possible to estimate specific yield when gravity-change observations are made at a well where concurrent water-level measurements are made, and gravity and water-level changes are occurring consistently over a period of time.\n',
        //count: 58
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/arcgis/rest/services/Gravity_change_in_the_Upper_San_Pedro_Basin_2014_2015/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'FID',
        definitionExpression: null,
        dateOptions: { year: 'numeric', month: 'long', day: 'numeric' },
        chartType: [''],
        chartProperties: [
          {
            query: '1=1',
            chartTitle: '',
            yAxisTitle: '',
            dataField: 'dg_mH2O',
            siteNameField: '',
            timestampField: '',
            outFields: ['dg_mH2O',],
            orderByFields: [''],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'Aquifer-storage change measured with microgravity',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'Station',
                  label: 'Station Name',
                },
                {
                  fieldName: 'g_2014',
                  label: 'g_2014',
                },
                {
                  fieldName: 'sd_2014',
                  label: 'sd_2014',
                },
                {
                  fieldName: 'g_2015',
                  label: 'g_2015',
                },
                {
                  fieldName: 'sd_2015',
                  label: 'sd_2015',
                },
                {
                  fieldName: 'dg_uGal',
                  label: 'dg_uGal',
                },
                {
                  fieldName: 'dg_sd_uGal',
                  label: 'dg_sd_uGal',
                },
                {
                  fieldName: 'dg_mH2O',
                  label: 'dg_mH2O',
                },
                {
                  fieldName: 'dg_sd_mH2O',
                  label: 'dg_sd_mH2O',
                },
                {
                  fieldName: 'Height',
                  label: 'Height',
                },
                {
                  fieldName: 'Height_Er',
                  label: 'Height_Er',
                },
                {
                  fieldName: 'dg_ftH2O',
                  label: 'dg_ftH2O',
                  format: {
                    places: 2,
                  }
                },
              ],
            },
          ],
        },
        timeSlider: false,
        symbol: {
          type: 'simple-marker',
          color: '#616161',
          style: 'circle',
          size: 6,
        },
        colorVisualVariables: {
          type: 'color',
          field: 'dg_mH2O',
          legendOptions: {
            title: 'Note: Total storage change, change in the thickness of a slab of freestanding water from 2014 to 2015, in feet',
          },
          stops: [
            { value: 0.25, color: '#d7191c', label: '0 - 0.25' },
            { value: 0.5, color: '#fdae61', label: '0.25 - 0.5' },
            { value: 0.75, color: '#ffdcbf', label: '0.5-0.75' },
            { value: 1.0, color: '#ffffbf', label: '0.75-1.0' },
            { value: 1.25, color: '#bde8f8', label: '1.0-1.25' },
            { value: 1.75, color: '#8dd6ef', label: '1.25 - 1.75' },
            { value: 2.0, color: '#2c7bb6', label: '1.75 - 2.0' },
            { value: 5.0, color: '#0f4a74', label: '> 2.0' },
          ],
        },
      },
      {
        id: '4',
        parentID: '12',
        label: '',
        title: 'Groundwater budget balance',
        checked: false,
        tooltipDescription:
          'An accounting exercise that calculates a single-value estimate of the surplus or deficit in the groundwater supply across an entire watershed. The resulting balance indicates whether the regional aquifer is losing or accreting storage. Calculated annually from 2002 – 2012, and once per decade from 2020-on. Water Budget is only calculated for the Sierra Vista Subwatershed (SVSW) and not the full SPRNCA or USPB.',
        description:
          'The groundwater-budget provides a crude, single-value estimate of changes to the groundwater supply across the entire Sierra Vista Subwatershed. When the groundwater-budget balance remains greater than 0 acre-ft, it suggests that more groundwater will move toward the San Pedro River. When the groundwater-budget balance remains less than 0 acre-ft, it suggests the opposite—that less groundwater will move toward the river. At what point in time a change in the groundwater-budget indicator might affect the San Pedro River, however, is dependent on where the primary impacts (groundwater recharge or withdrawal) are taking place. In general, it is assumed that the closer groundwater recharge or discharge is to the river, the sooner these effects will affect river base flow and riparian health. Water Budget is only calculated for the Sierra Vista Subwatershed (SVSW) and not the full SPRNCA or USPB.',
        //count: 13
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/arcgis/rest/services/Indicator_4_Groundwater_Budget_Balance/FeatureServer/0',
        geometryUrl:
          'https://services6.arcgis.com/qsfT0E2It2u5vqBg/arcgis/rest/services/AOI_Dropdown_Selections/FeatureServer/4',
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric' },
        chartType: ['BarChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'Volume of water, in acre-ft',
            yAxisTitle: 'Volume of water, in acre-ft',
            dataField: 'TOTAL_WATER_BUDGET_BALANCE_AF',
            siteNameField: null,
            timestampField: 'YEAR',
            outFields: ['TOTAL_WATER_BUDGET_BALANCE_AF', 'YEAR'],
            orderByFields: ['YEAR'],
          },
        ],
        chartData: { data: [] },
        popupTemplate: null,
        timeSlider: false,
        symbol: {
          type: 'simple-fill',
          style: 'solid',
          color: 'rgba(35,114,179,.3)',
          outline: {
            color: '#2372b3',
            width: '2px',
          },
        },
      },
    ],
  },
  {
    id: '13',
    label: '',
    title: 'Near-Stream Groundwater',
    description:
      'Near-stream Groundwater Indicators provide evidence related to the condition of the ecosystem along the San Pedro River and enable tracking of how it has changed or is trending over time.',
    open: false,
    indicators: [
      {
        id: '13',
        parentID: '13',
        label: '',
        title: 'Near-stream alluvial-aquifer water levels',
        checked: false,
        tooltipDescription:
          'Groundwater level below land surface measured in non-pumping wells of the Sierra Vista Subwatershed that are screened in the near-stream alluvial aquifer.',
        description:
          'Alluvial groundwater (or bank storage) can come from flood flows and enhanced-infiltration projects, as well as from a regional aquifer. Regardless of the source, increases in alluvial-groundwater levels are a direct and immediate indication of an increase in groundwater available to riparian plants and to discharge to the San Pedro River; decreases in alluvial-groundwater levels conversely indicate a loss of available groundwater for plants and the river. The lowest dry-season water levels are well correlated with riparian-system health. Along the San Pedro River, a multi-year declining trend in near-stream alluvial-aquifer levels may imply a decrease in groundwater that is available to the riparian area and as base flow to the stream. An increase in water levels may imply the reverse, an increase in groundwater supply available to the riparian area and the stream.',
        //count: 4354 
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/Indicator_5_Near_stream_alluvial_aquifer_water_levels/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric', month: 'long', day: 'numeric' },
        chartType: ['LineChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'Depth below land surface, in feet',
            yAxisTitle: 'Depth below land surface, in feet',
            dataField: 'lev_va',
            siteNameField: 'name',
            timestampField: 'lev_timestamp',
            outFields: ['name', 'lev_va', 'lev_timestamp'],
            orderByFields: ['lev_timestamp'],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'Near-stream alluvial-aquifer water levels',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'name',
                  label: 'Site Name',
                },
                {
                  fieldName: 'site_no',
                  label: 'Site Number',
                },
                {
                  fieldName: 'lev_va',
                  label: 'Depth below land surface (feet)',
                },
                {
                  fieldName: 'lev_timestamp',
                  label: 'Timestamp',
                },
              ],
            },
          ],
        },
        timeSlider: true,
        symbol: {
          type: 'simple-marker',
          color: '#08edb0',
          style: 'circle',
          size: 6,
        },
        colorVisualVariables: {
          type: 'color',
          field: 'lev_va',
          legendOptions: {
            title: 'Note: Ground water levels, in units(feet)',
          },
          stops: [
            { value: 5, color: '#2c7bb6', label: '0 - 5' },
            { value: 10, color: '#abd9e9', label: '6 - 10' },
            { value: 15, color: '#ffffbf', label: '11 - 15' },
            { value: 20, color: '#fdae61', label: '16 - 20' },
            { value: 50, color: '#d7191c', label: '> 20' },
          ],
        },
      },
      {
        id: '14',
        parentID: '13',
        label: '',
        title: 'Near-stream vertical gradients',
        checked: false,
        tooltipDescription:
          'The difference in groundwater elevation (relative to sea level) as a function of difference in height of the screens (opening to groundwater) in two adjacent wells.',
        description:
          'Near-stream vertical gradient values show whether groundwater is moving toward the stream channel (upward gradient; gaining reach) or from the stream channel toward the deeper regional aquifer (downward gradient; losing reach). The vertical gradient is calculated by taking the water-level elevation in the deep well minus the water-level elevation in the shallow well, and dividing it by the difference in the depth of the screen in the deep well minus the depth of the screen in the shallow well. The greater the magnitude of this value, the stronger the gradient.',
        //count: 26016 
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/Indicator_6_Near_stream_vertical_gradients/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric', month: 'long', day: 'numeric' },
        chartType: ['LineChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'Dimensionless',
            yAxisTitle: '',
            dataField: 'vertical_gradient',
            siteNameField: 'group_',
            timestampField: 'datetime',
            outFields: ['group_', 'vertical_gradient', 'datetime'],
            orderByFields: ['datetime'],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'Near-stream vertical gradients',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'name_A',
                  label: 'Site Name',
                },
                {
                  fieldName: 'vertical_gradient',
                  label: 'Vertical Gradient',
                  format: {
                    places: 5,
                  }
                },
                {
                  fieldName: 'relative_to_baseline',
                  label: 'Relative to Baseline',
                },
                {
                  fieldName: 'datetime',
                  label: 'Timestamp',
                },
              ],
            },
          ],
        },
        timeSlider: true,
        symbol: {
          type: 'unique-value',
          legendOptions: {
            title: 'Note: Relative to baseline (mean of more recent 7 years)',
          },
          field: 'relative_to_baseline',
          uniqueValueInfos: [
            {
              value: 'Greater',
              label: 'Greater',
              symbol: {
                type: 'simple-marker',
                color: '#52fd00',
                style: 'circle',
                size: 6,
              },
            },
            {
              value: 'Less',
              label: 'Less',
              symbol: {
                type: 'simple-marker',
                color: '#f60303',
                style: 'circle',
                size: 6,
              },
            },
            {
              value: 'Other',
              label: 'Other',
              symbol: {
                type: 'simple-marker',
                color: '#e2e2e2',
                style: 'circle',
                size: 6,
              },
            },
          ],
        },
      },
      {
        id: '16',
        parentID: '13',
        label: '',
        title: 'Annual fluctuation of near-stream alluvial-aquifer water levels',
        checked: false,
        tooltipDescription:
          'The annual range of groundwater depths measured in continuously monitored, near-stream alluvial-aquifer wells. ',
        description:
          'This indicator is related to the health of the riparian forest—the less water levels fluctuate the healthier the trees. It is best evaluated through a continuous measurement of water levels in near-stream wells, ideally with pressure transducers recording water-level depth at least every 6 hours. The highest annual water level is selected from “winter” months, November to April, and annual dry-season low-water level is selected from summer months, May through September. Typically, the highest annual winter water levels occur in March, but highest winter water levels have been known to occur in all months from November to April. Typically, the lowest summer dry-season water levels occurred in June or July, but in years of less summer rain, such as 2009, the low did not occur until September at some locations.',
        //count: 114
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/arcgis/rest/services/Indicator_7_Annual_fluctuation_of_near_stream_alluvial_aquifer_water_levels/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric' },
        chartType: ['LineChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'Water Level fluctuation, in feet',
            yAxisTitle: 'Water Level fluctuation, in feet',
            dataField: 'annual_fluctuation',
            siteNameField: 'name',
            timestampField: 'year',
            outFields: ['name', 'Annual_fluctuation', 'year'],
            orderByFields: ['annual_fluctuation'],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'Annual fluctuation of near-stream alluvial-aquifer water levels',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'name',
                  label: 'Site Name',
                },
                {
                  fieldName: 'site_no',
                  label: 'Site Number',
                },
                {
                  fieldName: 'station_nm',
                  label: 'Station Name',
                },
                {
                  fieldName: 'annual_fluctuation',
                  label: 'Annual Fluctuation (feet)',
                  format: {
                    places: 2,
                  }
                },
                {
                  fieldName: 'year',
                  label: 'Timestamp',
                },
              ],
            },
          ],
        },
        timeSlider: false,
        symbol: {
          type: 'simple-marker',
          color: '#ede908',
          style: 'circle',
          size: 6,
          outline: {
            color: 'rgb(138,131,5)',
            width: 1.5,
          },
        },
        colorVisualVariables: {
          type: 'color',
          field: 'annual_fluctuation',
          legendOptions: {
            title: 'Note: Water Level Fluctuations, in units(feet)',
          },
          stops: [
            { value: 1.0, color: 'blue', label: '0.5-1.0' },
            { value: 1.5, color: 'green', label: '1.0-1.5' },
            { value: 2.0, color: 'yellow', label: '1.5 - 2.0' },
            { value: 5.0, color: 'red', label: '> 2.0' },
          ],
        },
      },
    ],
  },
  {
    id: '14',
    label: '',
    title: 'River Flow',
    description:
      'River Flow Indicators provide evidence realted to the condition of the riverine ecosystem and enable tracking of how river flows have changed or are trending over time.',
    open: false,
    indicators: [
      {
        id: '17',
        parentID: '14',
        label: '',
        title: 'Streamflow permanence',
        checked: false,
        tooltipDescription:
          'The percent of a year water is present at a given location in the SPRNCA measured  by evaluating data from 12 locations using 8 photography sites, 1 stage recorder site, and 3 gaging station sites.',
        description:
          'Streamflow permanence is measured by automatic remote digital cameras at 8 locations and by USGS stream gaging stations (including the Lewis Springs Stage Recorder) at 4 additional locations. From 2000 to 2003, a more comprehensive method of estimating streamflow permanence throughout the SPRNCA was employed that used temperature data loggers. Streamflow permanence explains more of the variance in the size (basal area) of cottonwoods and willows than either groundwater depth or groundwater fluctuation. Sites used for streamflow permanence are not necessarily representative of the entire stream reach, or even conditions nearby as there is great variability in flow conditions from place to place along the San Pedro River, especially during the dry late spring and early summer months. ',
        //count: 56983 
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/arcgis/rest/services/Indicator_8_Streamflow_Permanence/FeatureServer/0',
        geometryUrl:
          'https://services6.arcgis.com/qsfT0E2It2u5vqBg/arcgis/rest/services/Indicator_8_Streamflow_Permanence_Yearly_Percent_Flowing/FeatureServer/0',
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric' },
        chartType: ['LineChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'Percent of year with flow',
            yAxisTitle: 'Percent of year',
            dataField: 'percent_flowing',
            siteNameField: 'site',
            timestampField: 'year',
            outFields: ['site', 'percent_flowing', 'year'],
            orderByFields: ['year'],
            type: 'line',
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'Streamflow permanence',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'site',
                  label: 'Site',
                },
                {
                  fieldName: 'flow_code',
                  label: 'Flow Code',
                },
                {
                  fieldName: 'datetime',
                  label: 'Timestamp',
                },
              ],
            },
          ],
        },
        timeSlider: false,
        symbol: {
          type: 'unique-value',
          legendOptions: {
            title: 'Note: Indicates flow trend from wet to dry',
          },
          field: 'flow_code',
          uniqueValueInfos: [
            {
              value: '0',
              label: '0 - Dry',
              symbol: {
                type: 'simple-marker',
                color: '#767676',
                style: 'circle',
                size: 6,
              },
            },
            {
              value: '1',
              label: '1 - Wet',
              symbol: {
                type: 'simple-marker',
                color: '#52fd00',
                style: 'circle',
                size: 6,
              },
            },
            {
              value: '2',
              label: '2 - Wet',
              symbol: {
                type: 'simple-marker',
                color: '#52fd00',
                style: 'circle',
                size: 6,
              },
            },
          ],
        },
      },
      {
        id: '18',
        parentID: '14',
        label: '',
        title: 'Base flow discharge on San Pedro and Babocomari Rivers',
        checked: false,
        tooltipDescription: 'The amount of groundwater discharge that flows in a stream measured at USGS stream gages.',
        description:
          'Base flow refers to water that flows in the San Pedro River and Babocomari River channels in the absence of any immediate influence from storm runoff, and is composed of regional groundwater, alluvial groundwater, or both. Sometimes only discharge from a regional aquifer is counted as base flow; however, it is prohibitively difficult if not impossible to differentiate contributions of near-stream alluvial (bank storage) discharge from regional aquifer discharge in the case of the San Pedro River, and so all water present during low flow conditions is considered base flow. Base flow can be computed a few different ways. For the WHIP, the January 3-day low flow, which is largely independent of ET, is used to represent base-flow conditions. Three of the 4 discharge gaging stations where base flow is estimated are typically dry in June, the driest time of the year, so to estimate annual base flow on the San Pedro, the lowest average value for 3 consecutive January days is used, when base flow is typically present at all sites. Because the Charleston gaging station is in a perennial location, June 3-day low flow can be calculated for this one gaging station and so is also included.',
        //count: 237
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/Indicator_9_Base_flow_on_San_Pedro_and_Babocomari_Rivers/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric' },
        chartType: ['LineChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'Discharge in cubic feet per second',
            yAxisTitle: 'Discharge in cubic feet per second',
            dataField: 'baseflow_discharge_cfs',
            siteNameField: 'station_nm',
            timestampField: 'year',
            outFields: ['station_nm', 'baseflow_discharge_cfs', 'year'],
            orderByFields: ['year'],
            type: 'line',
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'Base flow discharge on San Pedro and Babocomari Rivers',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'station_nm',
                  label: 'Station Name',
                },
                {
                  fieldName: 'baseflow_discharge_cfs',
                  label: 'Base flow Discharge (cubic feet per second)',
                  format: {
                    places: 2,
                  }
                },
                {
                  fieldName: 'year',
                  label: 'Year',
                },
              ],
            },
          ],
        },
        timeSlider: false,
        symbol: {
          type: 'simple-marker',
          color: '#ed0808',
          style: 'circle',
          size: 6,
          outline: {
            color: 'rgb(138,5,5)',
            width: 1.5,
          },
        },
        colorVisualVariables: {
          type: 'color',
          field: 'baseflow_discharge_cfs',
          legendOptions: {
            title: 'Note: Base-flow using January annual 3-day low flow, in units(cubic feet per second)',
          },
          stops: [
            { value: 10, color: 'red', label: '6 - 10' },
            { value: 15, color: 'yellow', label: '11 - 15' },
            { value: 20, color: 'green', label: '16 - 20' },
            { value: 50, color: 'blue', label: '> 20' },
          ],
        },
      },
      {
        id: '19',
        parentID: '14',
        label: '',
        title: 'June wet-dry status',
        checked: false,
        tooltipDescription:
          'A mainly 1-day, on-the-ground, visual evaluation of the San Pedro River during the driest time of the year to determine location and length of wetted stream lengths as well as total wetted length of the river measured with GPS units by NGO and agency staff, and citizen scientists.',
        description:
          'The wet-dry mapping fieldwork is conducted by volunteer citizen scientists who survey assigned river reaches on foot or horseback. Using hand-held GPS units, volunteers record the start and end points of each wetted reach. A “wetted reach” has to be at least 30 ft in length and separated from adjacent wetted reaches by at least 30 ft of dry streambed. Two or more wetted sections separated by less than 30 ft of dry streambed are considered a single wetted reach. The resulting maps, created in GIS, determine where a spatially intermittent stream has surface flow and where it is dry at a specific time of the year. ',
        //count: 2659 
        url: 'https://services.arcgis.com/F7DSX1DSNSiWmOqh/ArcGIS/rest/services/WHIP_SPRNCA_Web_Map_WFL1/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'FID',
        definitionExpression: null,
        dateOptions: { year: 'numeric', month: 'long', day: 'numeric' },
        chartType: [''],
        chartProperties: [],
        chartData: [''],
        popupTemplate: null,
        timeSlider: true,
        symbol: {
          type: 'simple-marker',
          color: '#ed0808',
          style: 'circle',
          size: 6,
          outline: {
            color: 'rgb(138,5,5)',
            width: 1.5,
          },
        },
      },
      {
        id: '20',
        parentID: '14',
        label: '',
        title: 'San Pedro River water quality',
        checked: false,
        tooltipDescription:
          'Surface-water samples collected near the Charleston stream gaging site from 1964 to 2012 and analyzed for a suite of water-quality analytes and parameters.',
        description:
          'A wide variety of water-quality data have been obtained from San Pedro River surface-water samples collected at the Charleston stream-gaging location since 1964, and the location has been a long-term National Water-Quality Assessment (NAWQA) reference site from 1991 to 2012. During this later period, all samples were collected with nationally consistent protocols. To better understand the trends in the water-quality analytes of interest, the analytes were analyzed on the basis of four components—their relation to (1) discharge, (2) seasonality, (3) long-term trend, and (4) a random component using Hirsch and Di Cicco’s (2014) Exploration and Graphics for River Trends (EGRET-WRTDS) tool. Most data were collected from 1987 to 2015. Sampling included field parameters, major-ion concentrations, nutrients, suspended sediment, and trace elements. See report figures on <a href="https://pubs.er.usgs.gov/publication/sir20165114">p. 50 - 63; figs. 34 - 41.</a>',
        //count: 17614 
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/arcgis/rest/services/Indicator_11_San_Pedro_River_water_quality/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric', month: 'long', day: 'numeric' },
        chartType: [''],
        chartProperties: [
          {
            query: '1=1',
            chartTitle: '',
            yAxisTitle: '',
            dataField: 'parm_nm',
            siteNameField: '',
            timestampField: '',
            outFields: ['parm_nm',],
            orderByFields: [''],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'San Pedro River water quality',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'parm_nm',
                  label: 'Parameter Name',
                },
                {
                  fieldName: 'result_va',
                  label: '',
                },
                {
                  fieldName: 'station_name',
                  label: 'Station Name',
                },
                {
                  fieldName: 'sample_timestamp',
                  label: 'Timestamp',
                },
              ],
            },
          ],
        },
        timeSlider: false,
        symbol: {
          type: 'simple-marker',
          color: '#e508ed',
          style: 'circle',
          size: 6,
          outline: {
            color: 'rgb(109,5,138)',
            width: 1.5,
          },
        },
      },
      {
        id: '21',
        parentID: '14',
        label: '',
        title: 'San Pedro and Babocomari Rivers isotope analysis',
        checked: false,
        tooltipDescription:
          'Concentrations in water of stable isotopes of oxygen and hydrogen provide information about the source of groundwater including its elevation of recharge and also about any changes in the relative contribution of groundwater to surface streams. ',
        description:
          'Analysis of stable-isotope ratios of oxygen (δ18O) and hydrogen (δ2H) is used to investigate groundwater inputs to river flow and evaluate how that may be changing through time. An increasing trend in the concentration of δ18O in surface water at a given location could reflect a decrease in the amount of groundwater entering the stream; conversely, a decreasing trend in δ18O could reflect an increase in the amount of groundwater entering the stream. The concentration of δ18O tends to be higher when evaporation occurs, and this implies that the groundwater contribution to the stream (no evaporation occurring) relative to that from upstream surface water (evaporation occurring) is decreasing.',
        //count: 932
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/arcgis/rest/services/Indicator_12_San_Pedro_and_Babocomari_Rivers_isotope_analysis_view/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric', month: 'long', day: 'numeric' },
        chartType: ['LineChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'd18O, in per mil',
            yAxisTitle: 'd18O, in per mil',
            dataField: 'p82085',
            siteNameField: 'station_nm',
            timestampField: 'sample_timestamp',
            outFields: ['p82085', 'p82082', 'station_nm', 'sample_timestamp'],
            orderByFields: ['sample_timestamp'],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'San Pedro and Babocomari Rivers isotope analysis',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'station_nm',
                  label: 'Station Name',
                },
                {
                  fieldName: 'p82082',
                  label: '',
                },
                {
                  fieldName: 'p82085',
                  label: '',
                },
                {
                  fieldName: 'sample_timestamp',
                  label: 'Timestamp',
                },
              ],
            },
          ],
        },
        timeSlider: false,
        symbol: {
          type: 'simple-marker',
          color: '#ed8208',
          style: 'circle',
          size: 6,
          outline: {
            color: 'rgb(138,76,5)',
            width: 1.5,
          },
        },
      },
    ],
  },
  {
    id: '15',
    label: '',
    title: 'Springs',
    description:
      'Springs Indicators provide evidence related to the condition of water available to springs and enable tracking of how springs are trending over time.',
    open: false,
    indicators: [
      {
        id: '22',
        parentID: '15',
        label: '',
        title: 'Springs discharge',
        checked: false,
        tooltipDescription:
          'The amount of water discharging from a spring source per unit of time measured at 4 springs and 1 flowing well using a manual method such as a current meter, a flume, or a container of known volume.',
        description:
          'The Sierra Vista subwatershed springs include 3 springs on the west side of the river and one on the east side, plus one flowing (also called artesian) well on the east side (the McDowell-Craig Farm well). A spring is a point of groundwater discharge to the surface, and thus spring discharge measurements provide information about trends in groundwater flow from areas of natural or managed recharge. The greater the discharge at a spring, the greater the recharge that must be occurring upgradient of the spring, and vice versa.',
        //count: 374
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/arcgis/rest/services/Indicator_13_Springs_discharge/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric', month: 'long', day: 'numeric' },
        chartType: ['LineChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'Discharge, in cubic feet per second',
            yAxisTitle: 'Discharge, in cubic feet per second',
            dataField: 'discharge_va',
            siteNameField: 'name',
            timestampField: 'measurement_dt',
            outFields: ['name', 'discharge_va', 'measurement_dt'],
            orderByFields: ['discharge_va'],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'Springs discharge',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'name',
                  label: 'Name',
                },
                {
                  fieldName: 'discharge_va',
                  label: 'discharge_va',
                  format: {
                    places: 2,
                  }
                },
                {
                  fieldName: 'measurement_dt',
                  label: 'measurement_dt',
                },
                {
                  fieldName: 'agency_cd',
                  label: 'agency_cd',
                },
                {
                  fieldName: 'measurement_nu',
                  label: 'measurement_nu',
                },
                {
                  fieldName: 'tz_cd',
                  label: 'tz_cd',
                },
                {
                  fieldName: 'q_meas_used_fg',
                  label: 'q_meas_used_fg',
                },
                {
                  fieldName: 'party_nm',
                  label: 'party_nm',
                },
                {
                  fieldName: 'site_visit_coll_agency_cd',
                  label: 'site_visit_coll_agency_cd',
                },
                {
                  fieldName: 'gage_height_va',
                  label: 'gage_height_va',
                },
                {
                  fieldName: 'measured_rating_diff',
                  label: 'measured_rating_diff',
                },
                {
                  fieldName: 'gage_va_change',
                  label: 'gage_va_change',
                },
                {
                  fieldName: 'gage_va_time',
                  label: 'gage_va_time',
                },
                {
                  fieldName: 'control_type_cd',
                  label: 'control_type_cd',
                },
                {
                  fieldName: 'discharge_cd',
                  label: 'discharge_cd',
                },
              ],
            },
          ],
        },
        timeSlider: false,
        symbol: {
          type: 'simple-marker',
          color: '#081bed',
          style: 'circle',
          size: 6,
          outline: {
            color: 'rgb(5,16,138)',
            width: 1.5,
          },
        },
      },
      {
        id: '23',
        parentID: '15',
        label: '',
        title: 'Springs water quality',
        checked: false,
        tooltipDescription:
          'Surface-water samples from spring flow were analyzed for wastewater and pharmaceutical suites four times spanning 2006 to 2010, collected with passive samplers at Murray, Horsethief, and Lewis Springs.',
        description:
          'Murray Spring was sampled 4 times (2006, 2008, 2009, 2010) and Horsethief and Lewis Springs were each sampled once (2009). Water quality analyses included wastewater and pharmaceutical suites as well as field parameters. Passive samplers can detect compounds at lower concentrations than discrete sampling (volumes of water collected at a single location at one point in time). In 2009, passive samplers were deployed at Murray, Horsethief, and Lewis Springs. In 2006 and 2010, only discrete samples were acquired from Murray Springs, and in both 2009 and 2010 discrete samples were also acquired from the Environmental Operations Park (Sierra Vista’s wastewater treatment facility). See report figures on <a href="https://pubs.er.usgs.gov/publication/sir20165114">p. 68 - 73; figs. 49 - 50.</a>',
        //count: 719
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/arcgis/rest/services/Indicator_14_Springs_water_quality/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric', month: 'long', day: 'numeric' },
        chartType: [''],
        chartProperties: [
          {
            query: '1=1',
            chartTitle: '',
            yAxisTitle: '',
            dataField: 'parm_nm',
            siteNameField: '',
            timestampField: '',
            outFields: ['parm_nm',],
            orderByFields: [''],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'Springs water quality',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'site_no',
                  label: 'site_no',
                },
                {
                  fieldName: 'station_nm',
                  label: 'station_nm',
                },
                {
                  fieldName: 'coord_acy_cd',
                  label: 'coord_acy_cd',
                },
                {
                  fieldName: 'dec_coord_datum_cd',
                  label: 'dec_coord_datum_cd',
                },
                {
                  fieldName: 'name',
                  label: 'name',
                },
                {
                  fieldName: 'agency_cd',
                  label: 'agency_cd',
                },
                {
                  fieldName: 'sample_end_dt',
                  label: 'sample_end_dt',
                },
                {
                  fieldName: 'sample_end_tm',
                  label: 'sample_end_tm',
                },
                {
                  fieldName: 'sample_start_time_datum_cd',
                  label: 'sample_start_time_datum_cd',
                },
                {
                  fieldName: 'tm_datum_rlbty_cd',
                  label: 'tm_datum_rlbty_cd',
                },
                {
                  fieldName: 'coll_ent_cd',
                  label: 'coll_ent_cd',
                },
                {
                  fieldName: 'medium_cd',
                  label: 'medium_cd',
                },
                {
                  fieldName: 'tu_id',
                  label: 'tu_id',
                },
                {
                  fieldName: 'body_part_id',
                  label: 'body_part_id',
                },
                {
                  fieldName: 'parm_cd',
                  label: 'parm_cd',
                },
                {
                  fieldName: 'remark_cd',
                  label: 'remark_cd',
                },
                {
                  fieldName: 'result_va',
                  label: 'result_va',
                },
                {
                  fieldName: 'val_qual_tx',
                  label: 'val_qual_tx',
                },
                {
                  fieldName: 'meth_cd',
                  label: 'meth_cd',
                },
                {
                  fieldName: 'dqi_cd',
                  label: 'dqi_cd',
                },
                {
                  fieldName: 'rpt_lev_va',
                  label: 'rpt_lev_va',
                },
                {
                  fieldName: 'sample_timestamp',
                  label: 'sample_timestamp',
                },
                {
                  fieldName: 'group_',
                  label: 'group_',
                },
                {
                  fieldName: 'parm_nm',
                  label: 'parm_nm',
                },
                {
                  fieldName: 'result_sample_fraction',
                  label: 'result_sample_fraction',
                },
                {
                  fieldName: 'SRSName',
                  label: 'SRSName',
                },
                {
                  fieldName: 'parm_unit',
                  label: 'parm_unit',
                },
              ],
            },
          ],
        },
        timeSlider: false,
        symbol: {
          type: 'simple-marker',
          color: '#028e0c',
          style: 'circle',
          size: 6,
          outline: {
            color: 'rgb(5,103,138)',
            width: 1.5,
          },
        },
      },
    ],
  },

  {
    id: '16',
    label: '',
    title: 'Non-Indicator Reference Data',
    description:
      'Non-Indicator Reference Data are date types that are closely related to sustainable groundwater use in the Sierra Vista Subwatershed of the Upper San Pedro Basin but that are not considered an indicator of sustainable groundwater use as defined in <a href="https://www.google.com/url?q=https://pubs.er.usgs.gov/publication/sir20165114&sa=D&source=docs&ust=1640281811850200&usg=AOvVaw30FPg9HQsO-qgDzhTl9aY7">Hydrological Conditions and Evaluation of Sustainable Groundwater Use in the Sierra Vista Subwatershed, Upper San Pedro Basin, Southeastern Arizona (Gungle, et al., 2016).</a> ',
    open: false,
    indicators: [
      {
        id: '24',
        parentID: '16',
        label: '',
        title: 'Precipitation',
        checked: false,
        tooltipDescription:
          'An estimate of the total liquid equivalent of all forms of precipitation (rain, snow, sleet, hail, etc.) that falls each year. The WHIP provides precipitation data from the National Oceanic and Atmospheric Administrations (NOAA) <a target="_blank" href="https://www.ncdc.noaa.gov/cag/divisional/time-series/0207/pcp/12/12/1895-2021?base_prd=true&begbaseyear=1901&endbaseyear=2000">Climate at a Glance</a> web page. These data are based on COOP data from Arizona Climate Division 7 (southeast Arizona).',
        description:
          'An estimate of the total liquid equivalent of all forms of precipitation (rain, snow, sleet, hail, etc.) that falls each year. The WHIP provides precipitation data from the National Oceanic and Atmospheric Administrations (NOAA) <a target="_blank" href="https://www.ncdc.noaa.gov/cag/divisional/time-series/0207/pcp/12/12/1895-2021?base_prd=true&begbaseyear=1901&endbaseyear=2000">Climate at a Glance</a> web page. These data are based on COOP data from Arizona Climate Division 7 (southeast Arizona).',
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/Arizona_Climate_Division_7_Annual_Precipitation_v1_1/FeatureServer/0',
        geometryUrl:
          'https://services6.arcgis.com/qsfT0E2It2u5vqBg/arcgis/rest/services/AOI_Dropdown_Selections/FeatureServer/4',
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric' },
        chartType: ['LineChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'NOAA, Arizona Climate Division 7, southeast Arizona',
            yAxisTitle: 'Precipitation, in inches',
            dataField: 'Inches',
            siteNameField: null,
            timestampField: 'Year',
            outFields: ['Inches', 'Year'],
            orderByFields: ['Year'],
          },
        ],
        chartData: { data: [] },
        popupTemplate: null,
        timeSlider: false,
        symbol: {
          type: 'simple-fill',
          style: 'solid',
          color: 'rgba(148,35,179,0.3)',
          outline: {
            color: '#2372b3',
            width: '2px',
          },
        },
      },
      {
        id: '25',
        parentID: '16',
        label: '',
        title: 'Population Estimate',
        checked: false,
        tooltipDescription:
          'The total number of people in each incorporated jurisdiction of the Upper San Pedro Basin Population estimates for 1980-2020 for incorporated city boundaries throughout Arizona. Produced by the Arizona Office of Economic Opportunity (OEO).',
        description:
          'The total number of people in the Upper San Pedro basin, by subwatershed. Population from US Census data every 10 years with intervening years obtained from the State of Arizona data estimates. Accurate counting along subwatershed boundaries requires obtaining data at the census block level although reasonable approximations can be made on a percent areal basis of census tracts that fall both in- and outside of the Upper San Pedro Basin if census block data are not available. These data are available from column U of the Sierra Vista Subwatershed Groundwater Budget Balance data download (Indicator 4).',
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/Incorporated_City_Boundaries_Populations_long/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'OBJECTID',
        definitionExpression: 'name IN(\'Bisbee\',\'Sierra Vista\', \'Huachuca City\', \'Tombstone\', \'Benson\' )',
        dateOptions: { year: 'numeric' },
        chartType: ['BarChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'Population Estimate, Incorporated Areas',
            yAxisTitle: 'Number of persons',
            dataField: 'population',
            siteNameField: 'name',
            timestampField: 'year',
            outFields: ['name', 'population', 'year'],
            orderByFields: ['year'],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'Population Estimate',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'Name',
                  label: 'Name',
                },
                {
                  fieldName: 'Incorporated',
                  label: 'Incorporated',
                },
                {
                  fieldName: 'Population',
                  label: 'population',
                },
                {
                  fieldName: 'Year',
                  label: 'Year',
                },
              ],
            },
          ],
        },
        timeSlider: false,
        symbol: {
          type: 'simple-fill',
          style: 'solid',
          color: 'rgba(186,234,146,0.03)',
          outline: {
            color: 'rgba(37,121,9,0.15)',
            width: '1px',
          },
        },
      },
      {
        id: '26',
        parentID: '16',
        label: '',
        title: 'Groundwater Pumping',
        checked: false,
        tooltipDescription:
          'The amount of groundwater withdrawn from the subsurface of the Sierra Vista Subwatershed each year. ',
        description:
          'The amount of groundwater withdrawn from the subsurface of the Sierra Vista Subwatershed each year. ',
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/Groundwater_Use_Sierra_Vista_Subwatershed/FeatureServer/0',
        geometryUrl:
          'https://services6.arcgis.com/qsfT0E2It2u5vqBg/arcgis/rest/services/AOI_Dropdown_Selections/FeatureServer/4',
        objectIDField: 'FID',
        definitionExpression: null,
        dateOptions: { year: 'numeric' },
        chartType: ['BarChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'Groundwater volume, acre-ft',
            yAxisTitle: 'Groundwater volume, acre-ft',
            dataField: 'Pumpage_AF',
            siteNameField: 'Type',
            timestampField: 'Year',
            outFields: ['Pumpage_AF', 'Type', 'Year'],
            orderByFields: ['Year'],
          },
        ],
        chartData: { data: [] },
        popupTemplate: null,
        timeSlider: false,
        symbol: {
          type: 'simple-fill',
          style: 'solid',
          color: 'rgba(179,35,35,0.3)',
          outline: {
            color: '#540404',
            width: '2px',
          },
        },
      },
      {
        id: '27',
        parentID: '16',
        label: '',
        title: 'EOP (Environmental Operations Park) Recharge',
        checked: false,
        tooltipDescription:
          'Environmental Operations Park (EOP) Recharge:  the City of Sierra Vista\'s waste water treatment and recharge facility',
        description:
          'The City of Sierra Vista\'s Environmental Operations Park (EOP) Recharge is the largest wastewater treatment facility in the Sierra Vista Subwatershed and also its largest managed recharge project. Constructed in the early 2000s through an agreement with the U.S. Bureau of Reclamation, the project began processing and recharging Sierra Vista wastewater in July, 2002. The EOP treatment process was further updated in 2012 with the construction of the Clarifier Retrofit Project.',
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/EOP_Recharge/FeatureServer/0',
        geometryUrl: null,
        objectIDField: 'ObjectId',
        definitionExpression: null,
        dateOptions: { year: 'numeric' },
        chartType: ['LineChart'],
        chartProperties: [
          {
            query: '',
            chartTitle: 'Volume recharged treated effluent, in acre-ft',
            yAxisTitle: 'Volume recharged treated effluent, in acre-ft',
            dataField: 'Recharge_AcreFeet',
            siteNameField: null,
            timestampField: 'Year',
            outFields: ['Recharge_AcreFeet', 'Year'],
            orderByFields: ['Year'],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'EOP (Environmental Operations Park)',
          outFields: ['*'],
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'Recharge_AcreFeet',
                  label: 'Recharge Acre Feet',
                },
                {
                  fieldName: 'Year',
                  label: 'Year',
                },
              ],
            },
          ],
        },
        timeSlider: false,
        symbol: {
          type: 'simple-marker',
          color: '#ed0808',
          style: 'circle',
          size: 6,
          outline: {
            color: 'rgb(138,5,5)',
            width: 1.5,
          },
        },
      },
      {
        id: '28',
        parentID: '16',
        label: '',
        title: 'Stream Discharge Data',
        checked: false,
        tooltipDescription:
            'Discharge is the volume of water moving down a stream or river per unit of time, commonly expressed in cubic feet per second. You can access all 14 gaging stations\' webpages on the <a target="_blank" href="https://nwis.waterdata.usgs.gov/usa/nwis/uv/?site_no=09470375&site_no=09470380&site_no=09470500&site_no=09470520&site_no=09470700&site_no=09470750&site_no=09470800&site_no=09470920&site_no=09471000&site_no=09471310&site_no=09471380&site_no=09471400&site_no=09471550&site_no=09471580&PARAmeter_cd=00060">USGS NWIS website</a>.',
        description:
            'Discharge data are currently available from the <a target="_blank" href="https://nwis.waterdata.usgs.gov/usa/nwis/uv/?site_no=09470375&site_no=09470380&site_no=09470500&site_no=09470520&site_no=09470700&site_no=09470750&site_no=09470800&site_no=09470920&site_no=09471000&site_no=09471310&site_no=09471380&site_no=09471400&site_no=09471550&site_no=09471580&PARAmeter_cd=00060">USGS NWIS website</a> for 10 active streamflow gaging station locations, 1 historic gaging station location (Greenbush Draw), and 3 stage recorders (streamflow height or stage but not discharge). A link to all 14 USGS streamflow gaging stations’ web pages is provided.',
        url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/DefaultMap/FeatureServer/1',
        geometryUrl: null,
        objectIDField: 'OBJECTID',
        definitionExpression: null,
        dateOptions: { year: 'numeric' },
        chartType: [''],
        chartProperties: [
          {
            query: '1=1',
            chartTitle: '',
            yAxisTitle: '',
            dataField: '',
            siteNameField: '',
            timestampField: '',
            outFields: ['',],
            orderByFields: [''],
          },
        ],
        chartData: { data: [] },
        popupTemplate: {
          title: 'Stream Gaging Station',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'STATION',
                  label: 'Station',
                },
                {
                  fieldName: 'LOCATION',
                  label: 'Location',
                },
              ],
            },
          ],
        },
        timeSlider: false,
        symbol: {
          type: 'simple-marker',
          color: '#ed9108',
          style: 'circle',
          size: 6,
          outline: {
            color: 'rgb(138,76,5)',
            width: 1.5,
          },
        },
      },
    ],
  },
];
