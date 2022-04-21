import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './LineChart.scss';

interface Props {
  chartData: any;
  selectedIndicator: any;
}
const LineChart = ({ chartData, selectedIndicator }: Props) => {
  const { chartProperties, title } = selectedIndicator;
  const siteNameField = chartProperties.map((data: any) => data.siteNameField);
  if (!chartProperties.length) return null;
  const { chartTitle, yAxisTitle } = chartProperties[0];

  const options = {
    chart: {
      type: 'line',
      zoomType: 'x',
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
      tickInterval: 1,
      type:
        title !== 'Annual fluctuation of near-stream alluvial-aquifer water levels' &&
        title !== 'Base flow discharge on San Pedro and Babocomari Rivers' &&
        title !== 'Precipitation' &&
        title !== 'EOP (Environmental Operations Park)' &&
        title !== 'Streamflow permanence' &&
        title !== 'EOP (Environmental Operations Park) Recharge'
          ? 'datetime'
          : '',
      labels: {
        format:
          title !== 'Annual fluctuation of near-stream alluvial-aquifer water levels' &&
          title !== 'Base flow discharge on San Pedro and Babocomari Rivers' &&
          title !== 'Precipitation' &&
          title !== 'EOP (Environmental Operations Park)' &&
          title !== 'Streamflow permanence' &&
          title !== 'EOP (Environmental Operations Park) Recharge'
            ? '{value:%Y}'
            : '',
      },
      title: {
        text: 'Year',
      },
    },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
      labels: {
        format: '{value:.1f}',
      },
      tickLength: 0,
      reversed: title === 'Regional-aquifer water levels' || title === 'Near-stream alluvial-aquifer water levels',
    },
    tooltip: {
      crosshairs: true,
    },
    plotOptions: {
      series: {
        stickyTracking: false,
        marker: {
          enabled: true,
        },
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: !siteNameField.includes(null),
    },
    series:
      chartData.length &&
      chartData.map((item: any) => {
        return {
          lineWidth: 0.5,
          dashStyle: 'Dash',
          ...item,
        };
      }),
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
        },
      ],
    },
  };
  return (
    <div className='chart-body' style={{ minWidth: '100%' }}>
      <div className='chart-header line-chart'>
        <div className='top-side'>
          <div className='left-side'>
            <h3>
              {title}
              <br />
            </h3>
            <div className='chart-title'>{chartTitle}</div>
          </div>
        </div>
      </div>
      {chartData.length ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <p className='no-data'>No data exists for that time range.</p>
      )}
    </div>
  );
};

export default LineChart;
