import { useState } from 'react';
import './Legend.scss';

const Legend = () => {
  const [toggleLegend, setToggleLegend] = useState(true);
  const collapseLegend = () => {
    setToggleLegend(!toggleLegend);
  };
  return (
    <div
      id='legend-widgets-container'
      className={
        toggleLegend
          ? 'esri-component esri-layer-list esri-widget esri-widget--panel legend-inactive'
          : 'esri-component esri-layer-list esri-widget esri-widget--panel legend-active'
      }
    >
      <div id='legend-wrapper-container'>
        <div className='legend-title' onClick={collapseLegend}>
          Legend & Layers
          <div className='arrow-icon'>
            {toggleLegend ? <i className='ri-arrow-up-s-line'></i> : <i className='ri-arrow-down-s-line'></i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
