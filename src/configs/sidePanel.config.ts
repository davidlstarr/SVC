export const sidePanelConfig = [
  /* {
    step: 1,
    title: 'Explore Area',
    panel: 'Explore & Analyze',
    page: 'explore-data',
    instructions:
      ' Optional: Draw an area on the map to identify indicators or upload your own data. The shapefile needs to be in format(.zip) and no larger than 2MB.',
    nextStep: 2,
    components: ['AOIDropdown', 'SearchDatasets'],
  },*/
  {
    step: 1,
    title: 'Explore Area & Search Indicators',
    panel: 'Explore & Analyze',
    page: 'explore-data',
    instructions:
      'Draw an area on the map to identify indicators, upload your own data (The shapefile needs to be in format(.zip) and no larger than 2MB.) or search for an indicator below. For more information on indicators of sustainable groundwater use in the Sierra Vista Subwatershed of the Upper San Pedro Basin, see p. 10-11 of <a href="https://pubs.er.usgs.gov/publication/sir20165114">USGS Scientific Investigations Report 2016-5114.</a>',
    nextStep: 3,
    components: ['AOIDropdown', 'SearchDatasets'],
  },
  {
    step: 2,
    title: 'Select Date Range',
    panel: 'Explore & Analyze',
    page: 'explore-data',
    instructions:
      'Use the date selector below to set the date range for your report. Some data may not be available for all date ranges, in that event the data will be displayed along side the other time filtered dataset. Please note, larger numbers of years will take longer to download.',
    nextStep: 4,
    components: ['DatePickerComponent'],
  },
  {
    step: 3,
    title: 'Export Report',
    panel: 'Explore & Analyze',
    page: 'explore-data',
    instructions: '',
    nextStep: 5,
    components: ['ExportPrintButtons'],
  },
  {
    step: 1,
    title: '',
    panel: 'Search & Download',
    page: 'download-data',
    instructions:
      'Start by searching the dataset you are interested in, preview and review the file in the right panel. Select a single file or multiple to download a zip file with the selected datasets.',
    nextStep: 2,
    components: ['SearchDatasets'],
  },
];
