import PropTypes from 'prop-types';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function ChartLine({ series }) {
  const chartOptions = useChart({
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    tooltip: {
      x: {
        show: false,
      },
      marker: { show: false },
    },
  });

  return (
    <Chart dir="ltr" type="line" series={series} options={chartOptions} width="100%" height={320} />
  );
}

ChartLine.propTypes = {
  series: PropTypes.array,
};
