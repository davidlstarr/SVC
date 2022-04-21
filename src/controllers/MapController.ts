import { loadModules, setDefaultOptions } from 'esri-loader';
import { RefObject } from 'react';
import config from '../configs';
import store from '../store';
import { setSiteNames } from '../store/slices/AOIFeatureSlice';
import { configureMeasurementObserver } from '../utils/miscHelperFunctions.utils';
import timeSliderController from './timeSliderController';
import wetDryController from './wetDryController';
import { DefaultLayersConfigTypes, IndicatorsConfigTypes, LayersConfigTypes } from '../types/layerType';
import { setPopupFeatures, setTimeSliderWidget } from '../store/slices/appSlice';

setDefaultOptions({ css: true, version: '4.22' });

class MapController {
  _mapview?: __esri.MapView;
  _map?: __esri.Map;
  _distanceMeasurementWidget?: __esri.DistanceMeasurement2D;
  _measurementObserver: MutationObserver | null = null;
  _activeMeasurementWidget: 'area' | 'distance' | null = null;
  _defaultFeatureLayer?: __esri.FeatureLayer;
  _featureLayer?: __esri.FeatureLayer;
  _nonIndicatorFeatureLayer?: __esri.FeatureLayer;
  _timeSliderIndicator?: __esri.FeatureLayer;

  initializeMap = async (domRef: RefObject<HTMLDivElement>) => {
    //The dom is required for esri modules.
    if (!domRef.current) {
      return;
    }
    const [Map, MapView, FeatureLayer, SimpleRenderer, Extent] = await loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/FeatureLayer',
      'esri/renderers/SimpleRenderer',
      'esri/geometry/Extent',
      'esri/layers/GraphicsLayer',
    ]);

    const { mapviewConfig, defaultLayersConfig } = config;

    this._map = new Map({
      basemap: 'topo',
    });

    this._mapview = new MapView({
      map: this._map,
      extent: new Extent(mapviewConfig.mapExtent),
      container: domRef.current,
      ...mapviewConfig,
    });

    defaultLayersConfig.forEach((data: DefaultLayersConfigTypes) => {
      const featureLayer = new FeatureLayer({
        url: data.url,
        title: data.title,
        id: data.id,
        visible: data.visible,
        renderer: new SimpleRenderer({
          symbol: data.symbol,
        }),
        labelingInfo: [data.label],
      });
      if (data.popupTemplate) {
        featureLayer.popupTemplate = data.popupTemplate;
      }
      this._defaultFeatureLayer = featureLayer;
      this._map?.add(featureLayer);
    });

    this._mapview?.when(() => {
      this.addMapWidgets();
      this.getSiteNamesFromReachesLayer();
      this.orderPopups();
    });
  };
  private addMapWidgets = async () => {
    const [Home, DistanceMeasurement2D, LayerList, Zoom, BasemapGallery, Expand] = await loadModules([
      'esri/widgets/Home',
      'esri/widgets/DistanceMeasurement2D',
      'esri/widgets/LayerList',
      'esri/widgets/Zoom',
      'esri/widgets/BasemapGallery',
      'esri/widgets/Expand',
    ]);

    const home = new Home({
      view: this._mapview,
    });

    this._mapview?.ui.remove('zoom');
    const zoom = new Zoom({
      view: this._mapview,
    });

    this._distanceMeasurementWidget = new DistanceMeasurement2D({
      view: this._mapview,
      container: 'distance-container-div',
    });

    this._distanceMeasurementWidget?.watch('active', (active) => {
      if (active) {
        configureMeasurementObserver('#distance-container-div', this._measurementObserver);
      }
    });

    const layerList = new LayerList({
      view: this._mapview,
      container: 'legend-widgets-container',
      listItemCreatedFunction: function (event: any) {
        const item = event.item;
        if (item.layer.type !== 'group') {
          item.panel = {
            content: 'legend',
            open: false,
          };
        }
      },
    });
    this._mapview?.ui.add(layerList, 'bottom-right');

    new BasemapGallery({
      view: this._mapview,
      container: 'basemap-wrapper-container',
    });

    const bgExpand = new Expand({
      expandIconClass: 'esri-icon-basemap',
      view: this._mapview,
      content: document.getElementById('basemap-widgets-container'),
      expandTooltip: 'Select Basemap',
    });

    timeSliderController.addTimeSliderWidgetMapBtn();

    /*const ccWidget = new CoordinateConversion({
      view: this._mapview,
    });
    this._mapview?.ui.add(ccWidget, 'bottom-left');*/

    this._mapview?.ui.add([home, zoom, bgExpand, 'measurement-widgets-container'], {
      position: 'top-left',
    });
  };
  private orderPopups = async () => {
    await this._mapview?.popup.watch('features', async (features: any) => {
      store.dispatch(setPopupFeatures(features));
    });
  };

  generateGeometry = async (layer: __esri.FeatureLayer, type?: string) => {
    const [GeometryEngine] = await loadModules(['esri/geometry/geometryEngine']);
    const featureSet = (await layer.queryFeatures({
      outFields: ['*'],
      where: '1=1',
      returnGeometry: true,
      outSpatialReference: mapController._mapview?.spatialReference,
    })) as __esri.FeatureSet;
    const features = featureSet.features;
    if (type === 'upload-shape') {
      return featureSet.features.map((feature) => feature.geometry);
    } else {
      return await GeometryEngine.union(features.map((feature) => feature.geometry));
    }
  };

  public set activeMeasurementWidget(widgetType: 'area' | 'distance' | null) {
    this._activeMeasurementWidget = widgetType;
  }

  setSelectedDataset = async (id: string, checked: boolean, layer?: any) => {
    const aoiLabel = store.getState().aoiReducer.AOILabel;
    if (!checked) {
      timeSliderController._watchSlider?.remove();
      this.mapLayers(id, checked);
      store.dispatch(setPopupFeatures([]));
    } else {
      if (layer) {
        this.mapLayers(id, checked);
        const intersectedIndicators = store.getState().aoiReducer.intersectedIndicators;
        const findIndicator: any = intersectedIndicators.find((value: any) => value.title === layer.title);
        const featureLayer: any = await this.generateFeatureLayer(layer);
        this.createLayerRendering(layer, featureLayer);

        if (aoiLabel.includes('Reach') && featureLayer.title === 'June wet-dry status') {
          if (intersectedIndicators.length > 0) {
            featureLayer.definitionExpression = `${layer.objectIDField} IN(${findIndicator.objectIds})`;
          }
        } else if (featureLayer.title !== 'June wet-dry status') {
          if (intersectedIndicators.length > 0) {
            featureLayer.definitionExpression = `${layer.objectIDField} IN(${findIndicator.objectIds})`;
          }
        }

        await this.generateWetDryAndIndicatorTimesliders(layer, featureLayer);
        this._featureLayer = featureLayer;
        this._map?.add(featureLayer);
      }
      this._map?.layers.map((layer) => {
        setTimeout(() => {
          if (id === layer.id) {
            layer.visible = checked;
          }
        }, 500);
      });
    }
  };

  mapLayers = (id: string, checked: boolean) => {
    const timesliderLayers: any = [];
    this._map?.layers.map((layer: any) => {
      if (layer.indicatorTimeSlider) {
        timesliderLayers.push(true);
      }
      if (!checked) {
        setTimeout(() => {
          if (id === '19') {
            wetDryController.resetWetDryProperties();
          }
          if (id === layer.id) {
            layer.destroy();
          }
          if (layer.id.includes(id) && layer.id.includes('non-indicator')) {
            layer.destroy();
          }
        }, 800);
      }
    });
    if (timesliderLayers.length === 1) {
      store.dispatch(setTimeSliderWidget(false));
      timeSliderController._timeSlider?.destroy();
    }
  };

  generateFeatureLayer = async (layer: any) => {
    const [FeatureLayer, SimpleRenderer] = await loadModules([
      'esri/layers/FeatureLayer',
      'esri/renderers/SimpleRenderer',
    ]);

    const featureLayer = new FeatureLayer({
      url: layer.url,
      title: layer.title,
      id: layer.id,
      visible: false,
      label: 'indicator',
      popupTemplate: layer.popupTemplate,
      indicatorTimeSlider: layer.timeSlider,
      definitionExpression: layer.definitionExpression,
    });

    if (featureLayer.indicatorTimeSlider) {
      this._timeSliderIndicator = featureLayer;
    }
    if (layer.popupTemplate) {
      featureLayer.popupTemplate = layer.popupTemplate;
    }
    //Non-indicator, no-geometry indicators
    if (layer.geometryUrl) {
      const nonIndicatorFeatureLayer = new FeatureLayer({
        label: 'non-indicator',
        id: `${layer.id}-non-indicator`,
        title: `${layer.title} Graphic`,
        url: layer.geometryUrl,
        renderer: new SimpleRenderer({ symbol: layer.symbol }),
      });
      this._nonIndicatorFeatureLayer = nonIndicatorFeatureLayer;
      this._map?.add(nonIndicatorFeatureLayer);
    }
    return featureLayer;
  };

  createLayerRendering = async (layer: any, featureLayer: any) => {
    const [SimpleRenderer] = await loadModules(['esri/renderers/SimpleRenderer']);
    if (layer.title !== 'June wet-dry status' && layer.symbol.type !== 'unique-value') {
      featureLayer.renderer = new SimpleRenderer({ symbol: layer.symbol });
      featureLayer.renderer.visualVariables = layer.colorVisualVariables ? [layer.colorVisualVariables] : [];
    } else if (layer.title !== 'June wet-dry status') {
      featureLayer.renderer = layer.symbol;
    }
  };

  generateWetDryAndIndicatorTimesliders = async (layer: any, featureLayer: any) => {
    const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);
    timeSliderController._timeSlider?.destroy();
    if (layer.title === 'June wet-dry status') {
      const fullRiverUrl = `${layer.url.slice(0, layer.url.length - 1)}1`;
      const fullRiverLayer = new FeatureLayer({
        id: 'wet-dry-full-river',
        title: 'June Dry Full River',
        url: fullRiverUrl,
      });

      this._map?.add(fullRiverLayer);
      wetDryController.activateViewExtentQuery(featureLayer);
    }
    if (layer.timeSlider) {
      timeSliderController.addTimeSliderWidget(featureLayer, layer.title);
    } else {
      let count = 0;
      this._map?.layers.map((layer: any) => {
        if (layer.indicatorTimeSlider) {
          count++;
        }
      });
      if (count > 0) {
        if (!layer.timeInfo) {
          timeSliderController.addTimeSliderWidget(this._timeSliderIndicator);
        } else {
          timeSliderController.addTimeSliderWidget(featureLayer);
        }
      }
    }
  };

  resetLayerData = () => {
    const layerData = store.getState().activeLayersReducer.layersData;
    return layerData.map((data: LayersConfigTypes) => {
      return {
        ...data,
        indicators: data.indicators.map((indicator: IndicatorsConfigTypes) => {
          return { ...indicator, checked: false };
        }),
      };
    });
  };

  getSiteNamesFromReachesLayer = async () => {
    const { AOILayersConfig } = config;
    const reachesLayer = (await this._map?.layers.find(
      (layer: any) => layer.title === 'SPRNCA Reaches'
    )) as __esri.FeatureLayer;

    if (reachesLayer) {
      const query = reachesLayer?.createQuery();
      query.where = '1=1';
      query.returnDistinctValues = true;
      query.returnGeometry = false;
      query.outFields = ['ReachID', 'SiteName'];
      try {
        const queryResult = await reachesLayer.queryFeatures(query);
        const siteNames: any = queryResult.features.map((feature) => feature.attributes);

        store.dispatch(setSiteNames(siteNames.map((value: any) => value.SiteName)));
        siteNames.map((siteName: any) => {
          const pushSiteNameAOIDropdown = {
            id: siteName.SiteName,
            label: `Reach ${siteName.ReachID}, ${siteName.SiteName}`,
            value: null,
            url: reachesLayer.url,
            renderer: {
              type: 'simple',
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
          };
          AOILayersConfig.push(pushSiteNameAOIDropdown);
        });
      } catch (error) {
        return;
      }
    }
  };

  clearMapView = () => {
    this._map?.layers.map((layer: any) => {
      if (layer.label === 'indicator' || layer.label === 'non-indicator') {
        setTimeout(() => {
          layer.destroy();
        }, 500);
      }
    });
  };
}

const mapController = new MapController();

export default mapController;
