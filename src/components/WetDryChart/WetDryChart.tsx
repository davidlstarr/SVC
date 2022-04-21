import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCMore from 'highcharts/highcharts-more';
import './WetDryChart.scss';
import { useSelector } from 'react-redux';
import { AOILabelState } from '../../store/slices/AOIFeatureSlice';
import wetDryController from '../../controllers/wetDryController';

HCMore(Highcharts);

interface Props {
  chartData: any;
  containerWidth?: number;
  indicatorTitle?: string;
}
const WetDryChart = ({ chartData, containerWidth, indicatorTitle }: Props) => {
  const reach = useSelector(AOILabelState);
  const options = {
    title: {
      text: '',
    },
    chart: {
      type: 'columnrange',
      inverted: false,
      width: containerWidth,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      columnrange: {
        grouping: false,
      },
      series: {
        events: {
          mouseOut: function () {
            wetDryController.removeHighlight();
          },
        },
      },
    },
    yAxis: {
      min: 0,
      reversed: false,
      startOnTick: true,
      title: {
        text: 'Distance from the International Boundary from Mexico, in miles',
      },
      labels: {
        formatter: function (this: any) {
          return `${this.value}`;
        },
      },
    },
    xAxis: {
      reversed: false,
    },
    tooltip: {
      formatter: function () {
        const newThis = this as any;
        const FID = newThis.point.FID;
        wetDryController.highlightLineOnHover(FID);
        return `Year: ${newThis.point.x} low: ${newThis.point.low} high: ${newThis.point.high}`;
      },
    },
    series: chartData,
    credits: {
      text: '',
    },
    exporting: {
      enabled: false,
    },
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
      {indicatorTitle && (
        <div className='chart-header'>
          <div className='top-side'>
            <div className='left-side'>
              <h3>June wet-dry status {reach.includes('Reach') ? `(${reach})` : ''}</h3>
              <div className='chart-title'>San Pedro River Main Stem</div>
            </div>
          </div>
        </div>
      )}
      <HighchartsReact highcharts={Highcharts} options={options} />
      {reach.includes('Reach') ? (
        <p className='foot-note'> Note: Wetted segments may extend beyond selected reach</p>
      ) : (
        ''
      )}
    </div>
  );
};

export default WetDryChart;
