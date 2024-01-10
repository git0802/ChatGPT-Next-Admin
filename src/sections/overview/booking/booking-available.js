import sumBy from 'lodash/sumBy';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import { alpha, useTheme } from '@mui/material/styles';

import { fNumber } from 'src/utils/format-number';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function BookingAvailable({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const {
    colors = [theme.palette.primary.light, theme.palette.primary.main],
    series,
    options,
  } = chart;

  const total = sumBy(series, 'value');

  const chartSeries = (series.filter((i) => i.label === 'Sold out')[0].value / total) * 100;

  const chartOptions = useChart({
    legend: {
      show: false,
    },
    grid: {
      padding: { top: -32, bottom: -32 },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[0], opacity: 1 },
          { offset: 100, color: colors[1], opacity: 1 },
        ],
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        dataLabels: {
          name: { offsetY: -16 },
          value: { offsetY: 8 },
          total: {
            label: 'Tours',
            formatter: () => fNumber(total),
          },
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 8 }} />

      <Chart
        dir="ltr"
        type="radialBar"
        series={[chartSeries]}
        options={chartOptions}
        width="100%"
        height={310}
      />

      <Stack spacing={2} sx={{ p: 5 }}>
        {series.map((item) => (
          <Stack
            key={item.label}
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{
              typography: 'subtitle2',
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: alpha(theme.palette.grey[500], 0.16),
                borderRadius: 0.75,
                ...(item.label === 'Sold out' && {
                  bgcolor: colors[1],
                }),
              }}
            />
            <Box sx={{ color: 'text.secondary', flexGrow: 1 }}>{item.label}</Box>
            {item.value} Tours
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

BookingAvailable.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
