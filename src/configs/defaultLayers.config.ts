export const defaultLayersConfig = [
  {
    id: '50',
    title: 'Stream Gaging Station',
    url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/DefaultMap/FeatureServer/1',
    visible: false,
    symbol: {
      type: 'simple-marker',
      color: '#aa0606',
      style: 'square',
      size: 5,
    },
    label: {},
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
  },
  {
    id: '51',
    title: 'Wastewater Treatment Facilities',
    url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/DefaultMap/FeatureServer/2',
    visible: false,
    symbol: {
      type: 'simple-marker',
      color: '#edbf08',
      style: 'circle',
      size: 5,
    },
    label: {},
    popupTemplate: {
      title: 'Wastewater Treatment Facilities',
      content: [
        {
          type: 'fields',
          fieldInfos: [
            {
              fieldName: 'NAME',
              label: 'Name',
            },
          ],
        },
      ],
    },
  },
  {
    id: '52',
    title: 'Waterways',
    url: 'https://services.arcgis.com/F7DSX1DSNSiWmOqh/ArcGIS/rest/services/AZ_Hydro_Routes/FeatureServer/0',
    visible: true,
    symbol: {
      type: 'simple-line',
      color: '#0895ED',
      outline: {
        color: '#2372B3',
        width: 1,
      },
    },
    label: {
      symbol: {
        type: 'text',
        color: '#0895ED',
        font: {
          family: 'Ubuntu',
          size: 7,
        },
      },
      labelPlacement: 'center-along',
      labelPosition: 'above',
      repeatLabelDistance: 200,
      labelExpressionInfo: {
        expression: '$feature.NAME',
      },
    },
    popupTemplate: {},
  },
  {
    id: '53',
    title: 'Wells',
    url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/DefaultMap/FeatureServer/5',
    visible: false,
    symbol: {
      type: 'simple-marker',
      color: '#0dba07',
      style: 'circle',
      size: 5,
      outline: {
        color: '#001801',
        width: 1,
      },
    },
    label: {},
    popupTemplate: {
      title: 'Wells',
      content: [
        {
          type: 'fields',
          fieldInfos: [
            {
              fieldName: 'FID',
              label: 'FID',
            },
            {
              fieldName: 'id',
              label: 'id',
            },
            {
              fieldName: 'region',
              label: 'region',
            },
            {
              fieldName: 'name',
              label: 'name',
            },
            {
              fieldName: 'code',
              label: 'code',
            },
          ],
        },
      ],
    },
  },
  {
    id: '54',
    title: 'Springs',
    url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/DefaultMap/FeatureServer/6',
    visible: false,
    symbol: {
      type: 'simple-marker',
      color: '#9908ed',
      style: 'circle',
      size: 5,
      outline: {
        color: '#44034b',
        width: 1,
      },
    },
    label: {},
    popupTemplate: {
      title: 'Springs',
      content: [
        {
          type: 'fields',
          fieldInfos: [
            {
              fieldName: 'FID',
              label: 'FID',
            },
            {
              fieldName: 'ID',
              label: 'ID',
            },
          ],
        },
      ],
    },
  },
  {
    id: '55',
    title: 'SPRNCA Reaches',
    url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/DefaultMap/FeatureServer/7',
    visible: false,
    symbol: {
      type: 'simple-fill',
      color: 'rgba(255,221,2,0.3)',
      outline: {
        color: '#2372B3',
        width: 1,
      },
    },
    label: {
      symbol: {
        type: 'text',
        color: '#000000',
        font: {
          family: 'Ubuntu',
          size: 10,
          weight: 'bold',
        },
      },
      labelPlacement: 'center-center',
      labelExpressionInfo: {
        expression: '$feature.ReachID',
      },
    },
    popupTemplate: {
      title: 'SPRNCA Reaches',
      content: [
        {
          type: 'fields',
          fieldInfos: [
            {
              fieldName: 'Id',
              label: 'Id',
            },
            {
              fieldName: 'ReachID',
              label: 'ReachID',
            },
            {
              fieldName: 'Sin',
              label: 'Sin',
            },
            {
              fieldName: 'Hydro',
              label: 'Hydro',
            },
            {
              fieldName: 'SiteName',
              label: 'SiteName',
            },
            {
              fieldName: 'Condition',
              label: 'Condition',
            },
            {
              fieldName: 'Area',
              label: 'Area',
            },
          ],
        },
      ],
    },
  },
  {
    id: '56',
    title: 'SPRNCA Boundary',
    url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/DefaultMap/FeatureServer/8',
    visible: false,
    symbol: {
      type: 'simple-fill',
      color: 'rgba(26,255,0,0.1)',
      style: 'solid',
      outline: {
        color: '#2372B3',
        width: 1,
      },
    },
    label: {},
    popupTemplate: {
      title: 'SPRNCA Boundary',
      content: [
        {
          type: 'fields',
          fieldInfos: [
            {
              fieldName: 'FID',
              label: 'FID',
            },
            {
              fieldName: 'AREA',
              label: 'AREA',
            },
            {
              fieldName: 'PERIMETER',
              label: 'PERIMETER',
            },
            {
              fieldName: 'AZ_NCAS83_',
              label: 'AZ_NCAS83_',
            },
            {
              fieldName: 'AZ_NCAS831',
              label: 'AZ_NCAS831',
            },
            {
              fieldName: 'NCA_CASEFI',
              label: 'NCA_CASEFI',
            },
            {
              fieldName: 'NCA_NAME',
              label: 'NCA_NAME',
            },
            {
              fieldName: 'NCA_STATE',
              label: 'NCA_STATE',
            },
            {
              fieldName: 'ACRES',
              label: 'ACRES',
            },
          ],
        },
      ],
    },
  },
  {
    id: '57',
    title: 'ADWR Subflow Zone',
    url: 'https://services6.arcgis.com/qsfT0E2It2u5vqBg/ArcGIS/rest/services/AOI_Dropdown_Selections/FeatureServer/7',
    visible: false,
    symbol: {
      type: 'simple-fill',
      style: 'solid',
      color: 'rgba(216,149,252,0.3)',
      outline: {
        color: 'rgba(93,35,179,0.64)',
        width: '2px',
      },
    },
    label: {},
    popupTemplate: {},
  },
];
