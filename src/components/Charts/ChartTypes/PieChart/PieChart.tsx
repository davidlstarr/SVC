import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './PieChart.scss';

const PieChart = () => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      // enabled: false,
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemMarginTop: 12,
      itemMarginBottom: 12,
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: [
          {
            name: 'City Water Well',
            y: 10.85,
            color: '#6AABD4',
          },

          {
            name: 'Northern Well',
            y: 11.84,
            color: '#242C80',
          },
          {
            name: 'Southern Well',
            color: '#8ABB2A',
            y: 61.41,
            sliced: true,
            selected: true,
          },
          {
            name: 'Deep Water Well',
            y: 4.67,
            color: '#2372B3',
          },
        ],
      },
    ],
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
      <div className='chart-header spring-water ground-water'>
        <div className='top-side'>
          <div className='left-side'>
            <h3>Available Groundwater</h3>
          </div>
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
