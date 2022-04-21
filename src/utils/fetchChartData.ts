import { loadModules } from 'esri-loader';
import config from '../configs/index';

export async function getDataByYear(value: string) {
  const [QueryTask, Query] = await loadModules(['esri/tasks/QueryTask', 'esri/tasks/support/Query']);

  const byYear = `Year='${value}'`;
  const query = new Query() as __esri.Query;
  query.where = value === 'All' ? '1=1' : byYear;
  query.returnGeometry = false;
  query.returnDistinctValues = true;
  query.outFields = ['FMEAS', 'TMEAS', 'Year'];

  try {
    const queryTask = new QueryTask({ url: config.chartDataUrl });
    const queryResult = (await queryTask.execute(query)) as __esri.FeatureSet;
    return queryResult.features.map((feature) => feature.attributes);
  } catch (error) {
    return;
  }
}

export async function getAllYears() {
  const [QueryTask, Query] = await loadModules(['esri/tasks/QueryTask', 'esri/tasks/support/Query']);

  const query = new Query() as __esri.Query;
  query.where = '1=1';
  query.returnGeometry = false;
  query.returnDistinctValues = true;
  query.outFields = ['Year'];

  try {
    const queryTask = new QueryTask({ url: config.chartDataUrl });
    const queryResult = (await queryTask.execute(query)) as __esri.FeatureSet;
    return queryResult.features.map((feature) => feature.attributes.Year);
  } catch (error) {
    return;
  }
}
