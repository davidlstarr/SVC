export interface IndicatorsConfigTypes {
  id: string;
  parentID: string;
  url: string;
  objectIDField: string;
  dateOptions: any;
  symbol: any;
  label: string;
  title: string;
  tooltipDescription: string;
  description: string;
  checked: boolean;
  chartType: any;
  chartProperties: chartProperties[];
  chartData: any;
  popupTemplate: any;
}

export interface DefaultLayersConfigTypes {
  id: string;
  title: string;
  url: string;
  visible: boolean;
  symbol: any;
  label: any;
  popupTemplate: any;
}

export interface LayersConfigTypes {
  id: string;
  label: string;
  title: string;
  description: string;
  open: boolean;
  indicators: IndicatorsConfigTypes[];
}

export interface chartProperties {
  query: string;
  chartTitle: string;
  yAxisTitle: string;
  dataField: string;
  siteNameField: string | null;
  timestampField: string;
  outFields: string[];
  orderByFields: string[];
}
