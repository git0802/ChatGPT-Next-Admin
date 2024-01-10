import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function EcommerceCurrentBalance({
  title,
  sentAmount,
  currentBalance,
  sx,
  ...other
}) {
  const totalAmount = currentBalance - sentAmount;

  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h3">{fCurrency(totalAmount)}</Typography>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Order Total
          </Typography>
          <Typography variant="body2">{fCurrency(currentBalance)}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Earning
          </Typography>
          <Typography variant="body2">- {fCurrency(sentAmount)}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Refunded
          </Typography>
          <Typography variant="subtitle1">{fCurrency(totalAmount)}</Typography>
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <Button fullWidth variant="contained" color="warning">
            Request
          </Button>

          <Button fullWidth variant="contained" color="primary">
            Transfer
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}

EcommerceCurrentBalance.propTypes = {
  currentBalance: PropTypes.number,
  sentAmount: PropTypes.number,
  sx: PropTypes.object,
  title: PropTypes.string,
};
