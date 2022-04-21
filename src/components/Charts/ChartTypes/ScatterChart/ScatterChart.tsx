import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './ScatterChart.scss';
// import { useSelector } from 'react-redux';
// import { chartYearState } from '../../../../store/slices/chartSlice';

interface Props {
  chartData: any;
  selectedIndicator: any;
}

const ScatterChart = ({ chartData, selectedIndicator }: Props) => {
  //const year = useSelector(chartYearState);
  // get data needed from this and remove unnecessary props
  const { chartProperties, title } = selectedIndicator;
  //return null for now so app doesn't crash
  if (!chartProperties.length) return null;
  const { chartTitle } = chartProperties[0];

  const options = {
    chart: {
      // changed to line in order to bring over datetime correctly and use highlighting properties
      type: 'line',
      zoomType: 'xy',
      className: 'chart-container',
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      tickLength: 3,
      tickInterval: 1000,
      reversed: false,
      visible: true,
      accessibility: {
        description: 'Year',
      },
      type: 'datetime',
      labels: {
        overflow: 'visible',
        format: '{value:%Y}',
      },
      title: {
        text: 'Year',
      },
    },
    yAxis: [
      {
        title: {
          text: chartTitle,
          align: 'middle',
        },
        reversed: false,
        visible: true,
        startOnTick: true,
        endOnTick: true,
        tickInterval: 0.0005,
        labels: {
          overflow: 'visible',
        },
        accessibility: {
          description: chartTitle,
        },
      },
    ],
    tooltip: {
      crosshairs: true,
    },
    plotOptions: {
      series: {
        borderColor: 'red',
        borderWidth: 1,
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: true,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              enabled: true,
            },
          },
        },
      ],
    },
    series: chartData.map((item: any) => {
      return {
        lineWidth: 0.5,
        ...item,
      };
    }),
  };

  return (
    <div className='chart-body' style={{ minWidth: '100%' }}>
      <div className='chart-header scatter-chart'>
        <div className='top-side'>
          <div className='left-side'>
            <h3>{title}</h3>
          </div>
        </div>
      </div>
      {chartData.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <div className='no-data'> No data exists for that time range.</div>
      )}
    </div>
  );
};

export default ScatterChart;
