import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';

import { fPercent, fCurrency } from 'src/utils/format-number';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function BookingTotalIncomes({
  title,
  total,
  percent,
  color = 'primary',
  chart,
  sx,
  ...other
}) {
  const theme = useTheme();

  const {
    colors = [theme.palette[color].main, theme.palette[color].dark],
    series,
    options,
  } = chart;

  const chartOptions = useChart({
    colors: [colors[1]],
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[0], opacity: 1 },
          { offset: 100, color: colors[1], opacity: 1 },
        ],
      },
    },
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    stroke: {
      width: 4,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    tooltip: {
      marker: {
        show: false,
      },
      y: {
        formatter: (value) => fCurrency(value),
        title: {
          formatter: () => '',
        },
      },
    },
    ...options,
  });

  return (
    <Stack
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette[color].light, 0.2),
          endColor: alpha(theme.palette[color].main, 0.2),
        }),
        p: 3,
        borderRadius: 2,
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <div>
          <Box sx={{ mb: 1, typography: 'subtitle2' }}>{title}</Box>
          <Box sx={{ typography: 'h3' }}>{fCurrency(total)}</Box>
        </div>

        <div>
          <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="flex-end">
            <Iconify icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />

            <Box sx={{ typography: 'subtitle2' }}>
              {percent > 0 && '+'}
              {fPercent(percent)}
            </Box>
          </Stack>

          <Box sx={{ mt: 0.5, opacity: 0.8, typography: 'body2' }}>than last month </Box>
        </div>
      </Stack>

      <Chart
        dir="ltr"
        type="line"
        series={[{ data: series }]}
        options={chartOptions}
        width="100%"
        height={118}
      />
    </Stack>
  );
}

BookingTotalIncomes.propTypes = {
  chart: PropTypes.object,
  color: PropTypes.string,
  percent: PropTypes.number,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
