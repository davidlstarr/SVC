import { loadModules, setDefaultOptions } from 'esri-loader';
import mapController from './MapController';

setDefaultOptions({ css: true, version: '4.22' });

class PrintController {
  _legend?: __esri.Legend;
  addLegendWidgetToMap = async () => {
    this._legend?.destroy();
    const [Legend] = await loadModules(['esri/widgets/Legend']);
    const legend = new Legend({
      view: mapController._mapview,
      container: 'legend-container',
    });
    this._legend = legend;
  };
}

const printController = new PrintController();

export default printController;
