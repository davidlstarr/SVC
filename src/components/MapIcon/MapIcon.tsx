interface Props {
  fullWidthCharts: boolean;
  handleCollapseChartPanel: (value: any) => void;
  className: string;
}

const MapIcon = ({ fullWidthCharts, handleCollapseChartPanel, className }: Props) => {
  return (
    <button className={fullWidthCharts ? `${className} active` : `${className}`} onClick={handleCollapseChartPanel}>
      {fullWidthCharts && (
        <span className='arrow-icon'>
          <i className='ri-arrow-left-s-line'></i>
        </span>
      )}

      <span className='map-icon'>
        <i className='ri-map-2-fill'></i>
      </span>
      {!fullWidthCharts && (
        <span className='arrow-icon'>
          <i className='ri-arrow-right-s-line'></i>
        </span>
      )}
    </button>
  );
};

export default MapIcon;
