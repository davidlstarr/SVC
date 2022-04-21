import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './BarChart.scss';
interface Props {
  chartData: any;
  selectedIndicator: any;
}

const BarChart = ({ chartData, selectedIndicator }: Props) => {
  const { chartProperties, title } = selectedIndicator;
  const siteNameField = chartProperties.map((data: any) => data.siteNameField);
  if (!chartProperties.length) return null;
  const { chartTitle, yAxisTitle } = chartProperties[0];
  Highcharts.setOptions({
    lang: {
      thousandsSep: ',',
    },
  });
  const options = {
    chart: {
      type: 'column',
      className: 'chart-container',
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: [
      {
        title: {
          text: 'Year',
          align: 'middle',
        },
        type: title !== 'Population Estimate' && title != 'Groundwater Pumping' ? 'datetime' : '',
        labels: {
          overflow: 'visible',
          format: title !== 'Population Estimate' && title != 'Groundwater Pumping' ? '{value:%Y}' : '',
        },
        reversed: false,
        visible: true,
        accessibility: {
          description: 'Year',
        },
      },
    ],
    yAxis: [
      {
        title: {
          text: yAxisTitle,
          align: 'middle',
        },
        reversed: false,
        visible: true,
        tickInterval: 2000,
        labels: {
          overflow: 'justify',
        },
        accessibility: {
          description: yAxisTitle,
        },
      },
    ],
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
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
          ...item,
        };
      }),
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
        },
      ],
    },
  };

  return (
    <div className='chart-body' style={{ minWidth: '100%' }}>
      <div className='chart-header bar-chart'>
        <div className='top-side'>
          <div className='left-side'>
            <h3>
              {title} <br />
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

export default BarChart;
