import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import RefreshIcon from '@material-ui/icons/Refresh';
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../../components/charts';

// ----------------------------------------------------------------------



export default function EventPriceGraph(props) {
  const {graphData} = props;
  const CHART_DATA = [
    {
      name: 'Yes',
      type: 'area',
      data: Object.values(graphData)
    },
    {
      name: 'No',
      type: 'area',
      data: Object.keys(graphData).map(row=>((10-graphData[row]).toFixed(2)))
    }
  ];
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 2] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['gradient', 'gradient'] },
    xaxis: { },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `₹${y.toFixed(0)}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <div style={{ textAlign: 'end', padding:"10px", }} >
        <RefreshIcon style={{cursor:"pointer"}}/>
      </div>
      <CardHeader title="Price variation with time" style={{paddingTop:'0px'}}/>
      {/* <CardHeader title="Website Visits" subheader="(+43%) than last year" /> */}
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={{...chartOptions, labels:Object.keys(graphData)}} height={364} />
      </Box>
    </Card>
  );
}
