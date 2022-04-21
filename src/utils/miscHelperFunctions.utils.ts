/**
 * Helper function to update the Measurement Hint text when it appears on the dom
 */
export const configureMeasurementObserver = (domElementID: string, measurementObserver: MutationObserver | null) => {
  const MutationObserver = window.MutationObserver;

  const attributeChangeCallback = (mutations: any) => {
    mutations.forEach((mutation: any) => {
      if (mutation.target.className.includes('hint-text')) {
        mutation.target.innerHTML =
          'Start to measure by clicking in the map to place your first point. <br /><br />Double-click on the map to finish measuring.';
        measurementObserver?.disconnect();
      }
    });
  };

  measurementObserver = new MutationObserver(attributeChangeCallback);
  const domElement = document.querySelector(domElementID);
  if (domElement) {
    measurementObserver.observe(domElement, {
      childList: true,
      subtree: true,
    });
  }
};
