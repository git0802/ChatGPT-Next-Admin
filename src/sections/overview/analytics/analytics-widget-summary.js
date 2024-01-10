import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { fShortenNumber } from 'src/utils/format-number';

import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function AnalyticsWidgetSummary({
  title,
  total,
  icon,
  color = 'primary',
  sx,
  ...other
}) {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette[color].light, 0.2),
          endColor: alpha(theme.palette[color].main, 0.2),
        }),
        py: 5,
        borderRadius: 2,
        textAlign: 'center',
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64, mb: 1 }}>{icon}</Box>}

      <Typography variant="h3">{fShortenNumber(total)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
        {title}
      </Typography>
    </Stack>
  );
}

AnalyticsWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
