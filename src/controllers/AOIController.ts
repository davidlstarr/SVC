import { loadModules, setDefaultOptions } from 'esri-loader';
import mapController from '../controllers/MapController';
import { IndicatorsConfigTypes, LayersConfigTypes } from '../types/layerType';
import store from '../store';
import {
  setLayersDataCopy,
  setLayersDataMultiple,
  setSingleSelectedDataSet,
  setStepOneSelectedDataSet,
  stepOneDefaultValues,
} from '../store/slices/featureLayerSlice';
import { setLoading } from '../store/slices/loadingSlice';
import {
  setAOILabel,
  setClearSelection,
  setIntersectedIndicators,
  setUpdateIntersectedIndicators,
} from '../store/slices/AOIFeatureSlice';
import uploadShapefileController from './UploadShapefileController';
import { mapviewConfig } from '../configs/mapview.config';

setDefaultOptions({ css: true, version: '4.22' });

class AOIController {
  _AOIFeatureLayer?: __esri.FeatureLayer;
  _graphicsLayer?: __esri.GraphicsLayer;
  _sketch?: __esri.Sketch;

  public addAOIPolygon = async (AOIValues: any) => {
    const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);
    const { id, value, label, renderer, url } = AOIValues;

    // AOIs from config file
    if (value) {
      this._AOIFeatureLayer?.destroy();
      const AOIFeatureLayer = new FeatureLayer({
        url: value,
        title: label,
        renderer: renderer,
      });
      this._AOIFeatureLayer = AOIFeatureLayer;
      mapController._map?.add(AOIFeatureLayer);
      const AOIGeometry: any = await mapController.generateGeometry(AOIFeatureLayer);
      mapController._mapview?.goTo(AOIGeometry);
      await this.AOIIntersectWithIndicator(AOIGeometry);
    } else {
      // Dynamic reaches
      const AOIFeatureLayer = new FeatureLayer({
        url: `${url}/7`,
        title: label,
        renderer: renderer,
        definitionExpression: `siteName='${id}'`,
      });
      this._AOIFeatureLayer = AOIFeatureLayer;
      mapController._map?.add(AOIFeatureLayer);
      store.dispatch(setLoading(false));
      if (AOIFeatureLayer) {
        const query = {
          where: `siteName='${id}'`,
          returnDistinctValues: true,
          outFields: ['ReachID', 'SiteName'],
        };
        const queryResult: any = await this.queryLayer(AOIFeatureLayer, query);
        const geometry: any = queryResult.features.map((feature: any) => feature.geometry);
        mapController._mapview?.goTo(geometry);
        await this.AOIIntersectWithIndicator(geometry[0]);
      }
    }
  };

  queryLayer = async (layer: __esri.FeatureLayer, layerQuery: any) => {
    const query = layer.createQuery();
    query.where = layerQuery.where;
    query.returnDistinctValues = layerQuery.returnDistinctValues;
    query.outFields = layerQuery.outFields;
    query.geometry = layerQuery.geometry;
    query.spatialRelationship = layerQuery.spatialRelationship;
    query.returnGeometry = layerQuery.returnGeometry;

    try {
      return await layer.queryFeatures(query);
    } catch (error) {
      return;
    }
  };

  drawAOIShape = async () => {
    const [Sketch, GraphicsLayer] = await loadModules(['esri/widgets/Sketch', 'esri/layers/GraphicsLayer']);
    this._sketch?.destroy();
    this._graphicsLayer?.destroy();
    const graphicsLayer = new GraphicsLayer({ title: 'New Area of Interest Shape' });
    mapController._map?.add(graphicsLayer);
    const sketch = new Sketch({
      layer: graphicsLayer,
      view: mapController._mapview,
      activeTool: 'polygon',
      creationMode: 'single',
      availableCreateTools: ['polygon', 'rectangle', 'circle'],
      visibleElements: {
        selectionTools: {
          'lasso-selection': false,
          'rectangle-selection': false,
          'pointer-selection': false,
        },
        undoRedoMenu: false,
        settingsMenu: false,
      },
    });
    this._sketch = sketch;
    this._graphicsLayer = graphicsLayer;
    this._sketch?.when(() => {
      if (sketch.activeTool === 'polygon') {
        sketch.create('polygon');
      }
    });
    sketch.on('create', (event: any) => {
      if (event.state === 'complete') {
        this.AOIIntersectWithIndicator(event.graphic.geometry);
        this._sketch?.destroy();
      }
    });

    mapController._mapview?.ui.add(sketch, 'top-right');
  };

  AOIIntersectWithIndicator = async (featureGeometry: any) => {
    store.dispatch(setLoading(true));
    const getLayerData = store.getState().activeLayersReducer.layersData;
    store.dispatch(setLayersDataMultiple([]));
    await this.getIndicatorIntersectResults(getLayerData, featureGeometry);
  };

  getIndicatorIntersectResults = async (getLayerData: any, AOIGeometry: any) => {
    const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer', 'esri/geometry/geometryEngine']);
    const indicatorUrls: string[] = [];
    getLayerData.forEach((data: LayersConfigTypes) => {
      data.indicators.forEach(async (indicator: IndicatorsConfigTypes) => {
        if (indicator.url) {
          const indicatorLayer = new FeatureLayer({
            url: indicator.url,
            title: indicator.label,
            opacity: 0,
            renderer: indicator.symbol,
            parentID: indicator.parentID,
          });

          const query = {
            geometry: AOIGeometry,
            spatialRelationship: 'intersects',
            returnGeometry: true,
            where: '1=1',
            returnDistinctValues: true,
            outFields: ['*'],
          };

          const result: any = await this.queryLayer(indicatorLayer, query);
          if (result.features.length > 0) {
            const indicatorObjectIds = result.features.map((data: any) => data.attributes[indicator.objectIDField]);
            let queryResultUrl = `${result.features[0]?.layer.url}/0`;
            if (indicator.title === 'Stream Discharge Data') {
              queryResultUrl = `${result.features[0]?.layer.url}/1`;
            }
            indicatorUrls.push(queryResultUrl);
            store.dispatch(
              setIntersectedIndicators({
                indicatorId: indicator.id,
                title: indicator.title,
                featureSet: result.features,
                objectIds: indicatorObjectIds,
              })
            );
          } else {
            store.dispatch(setLoading(false));
          }
        }
        if (indicatorUrls.length > 0) {
          const updateLayersData = getLayerData.filter((data: LayersConfigTypes) =>
            data.indicators.some((indicator: IndicatorsConfigTypes) => indicatorUrls.includes(indicator.url))
          );

          const filterIndicators = updateLayersData.map((data: LayersConfigTypes) => {
            return {
              ...data,
              indicators: data.indicators.filter((indicator: IndicatorsConfigTypes) =>
                indicatorUrls.includes(indicator.url)
              ),
            };
          });

          store.dispatch(setLayersDataCopy(filterIndicators));
          store.dispatch(setLoading(false));
        } else {
          store.dispatch(setLayersDataCopy([]));
        }
      });
    });
  };

  generateGraphicLayer = async (layer: any, layerGeometry: any) => {
    const [Graphic, GeometryEngine] = await loadModules(['esri/Graphic', 'esri/geometry/geometryEngine']);

    const geometry = GeometryEngine.union(layerGeometry.map((feature: any) => feature.geometry));
    const symbol = layer.symbol;

    return new Graphic({
      geometry: geometry,
      symbol: layer?.renderer?.symbol || symbol,
    });
  };

  clearSelection = () => {
    const resetLayerData = mapController.resetLayerData();
    store.dispatch(setClearSelection(false));
    store.dispatch(setAOILabel(''));
    mapController.setSelectedDataset('', false);
    mapController.clearMapView();
    mapController._mapview?.goTo(mapviewConfig.defaultExtent);
    this._AOIFeatureLayer?.destroy();
    this._graphicsLayer?.destroy();
    this._sketch?.destroy();
    uploadShapefileController._featureLayer?.destroy();
    store.dispatch(setUpdateIntersectedIndicators([]));
    store.dispatch(setStepOneSelectedDataSet(stepOneDefaultValues));
    store.dispatch(setStepOneSelectedDataSet(stepOneDefaultValues));
    store.dispatch(setLayersDataCopy(resetLayerData));
    store.dispatch(setSingleSelectedDataSet([]));
  };
}

const aoiController = new AOIController();

export default aoiController;
