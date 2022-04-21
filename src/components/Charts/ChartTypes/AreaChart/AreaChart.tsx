import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface Props {
  fullWidthCharts?: boolean;
  containerWidth: number;
}
const AreaChart = ({ fullWidthCharts, containerWidth }: Props) => {
  const options = {
    chart: {
      type: 'area',
      height: fullWidthCharts ? 90 : 80,
      width: containerWidth - 280,

      borderColor: null,
      borderWidth: 0,
      className: 'chart-container',
      plotBorderColor: null,
      plotBorderWidth: 0,
    },
    title: {
      text: '',
    },
    pane: {
      background: {
        borderWidth: 0,
      },
    },
    subtitle: {
      text: null,
      align: 'right',
      verticalAlign: 'bottom',
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: null,
      lineWidth: 0,
      tickLength: 0,
      gridLineWidth: 0,

      labels: {
        enabled: false,
      },
    },
    yAxis: {
      lineWidth: 0,
      gridLineWidth: 0,
      title: {
        text: '',
      },
      labels: {
        enabled: false,
      },
    },
    plotOptions: {
      area: {
        fillOpacity: 0.5,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'John',
        data: [0, 1, 4, 4, 5, 2, 3, 7],
        lineWidth: 1.2,
        marker: {
          radius: 2,
        },
      },
      {
        type: 'line',
        name: 'Jane',
        color: 'red',
        lineWidth: 1.2,
        data: [
          [0, 1.11],
          [5, 4.51],
          [7, 4.51],
        ],
        marker: {
          radius: 2,
        },
      },
    ],
  };

  return (
    <div className='chart-body' style={{ minWidth: '100%' }}>
      <div className='chart-header'>
        <div className='top-side'>
          <div className='left-side'>
            <h3>Springs Discharge Levels</h3>
          </div>
        </div>
        <div className={fullWidthCharts ? 'reduce-width bottom-side' : 'bottom-side'}>
          <span>Location</span>
          <span>Water Level Quarterly</span>
        </div>
      </div>
      <div className='location-chart'>
        <span>McDowell Artesian Well</span>
        <div className={fullWidthCharts ? 'chart' : ''}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
      <div className='location-chart'>
        <span>Horsethief Spring</span>
        <div className={fullWidthCharts ? 'chart' : ''}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
      <div className='location-chart'>
        <span>Murray Springs</span>
        <div className={fullWidthCharts ? 'chart' : ''}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
      <div className='location-chart'>
        <span>Lewis Springs</span>
        <div className={fullWidthCharts ? 'chart' : ''}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
      <div className='location-chart'>
        <span>Moson Springs</span>
        <div className={fullWidthCharts ? 'chart' : ''}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
