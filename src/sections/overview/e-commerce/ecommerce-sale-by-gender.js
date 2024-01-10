import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { styled, useTheme } from '@mui/material/styles';

import { fNumber } from 'src/utils/format-number';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 400;

const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

export default function EcommerceSaleByGender({ title, subheader, total, chart, ...other }) {
  const theme = useTheme();

  const {
    colors = [
      [theme.palette.primary.light, theme.palette.primary.main],
      [theme.palette.warning.light, theme.palette.warning.main],
    ],
    series,
    options,
  } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    colors: colors.map((colr) => colr[1]),
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    labels: series.map((i) => i.label),
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: colors.map((colr) => [
          { offset: 0, color: colr[0], opacity: 1 },
          { offset: 100, color: colr[1], opacity: 1 },
        ]),
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '68%' },
        dataLabels: {
          value: { offsetY: 16 },
          total: {
            formatter: () => fNumber(total),
          },
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />

      <StyledChart
        dir="ltr"
        type="radialBar"
        series={chartSeries}
        options={chartOptions}
        width="100%"
        height={300}
      />
    </Card>
  );
}

EcommerceSaleByGender.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
};
