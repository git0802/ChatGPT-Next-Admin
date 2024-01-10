import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';

import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function BookingBooked({ title, subheader, data, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {data.map((progress) => (
          <Stack key={progress.status}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Box sx={{ typography: 'overline' }}>{progress.status}</Box>
              <Box sx={{ typography: 'subtitle1' }}>{fShortenNumber(progress.quantity)}</Box>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={progress.value}
              color={
                (progress.status === 'Pending' && 'warning') ||
                (progress.status === 'Canceled' && 'error') ||
                'success'
              }
              sx={{
                height: 8,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16),
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

BookingBooked.propTypes = {
  data: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
