import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function BookingWidgetSummary({ title, total, icon, sx, ...other }) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        pl: 3,
        ...sx,
      }}
      {...other}
    >
      <Box>
        <Box sx={{ mb: 1, typography: 'h3' }}>{fShortenNumber(total)}</Box>
        <Box sx={{ color: 'text.secondary', typography: 'subtitle2' }}>{title}</Box>
      </Box>

      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
        }}
      >
        {icon}
      </Box>
    </Card>
  );
}

BookingWidgetSummary.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
