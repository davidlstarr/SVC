export const mapviewConfig = {
  //center: [-110.2, 31.647045],
  zoom: 10,
  navigation: {
    momentumEnabled: false,
  },
  constraints: {
    rotationEnabled: false,
  },
  highlightOptions: {
    color: 'white',
    fillOpacity: 1,
    haloColor: 'black',
    haloOpacity: 0.9,
  },
  mapExtent: {
    xmin: -12255227.316,
    ymin: 3805895.443,
    xmax: -12282615.659,
    ymax: 3629509.834,
    spatialReference: {
      wkid: 102100,
    },
  },
  defaultExtent: {
    center: [-110.2, 31.647045],
    zoom: 10,
  },
  spatialReference: {
    wkid: 102100, // Web Mercator
  },
};
