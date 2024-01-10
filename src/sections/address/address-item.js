import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function AddressItem({ address, action, sx, ...other }) {
  const { name, fullAddress, addressType, phoneNumber, primary } = address;

  return (
    <Stack
      component={Paper}
      spacing={2}
      alignItems={{ md: 'flex-end' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <Stack flexGrow={1} spacing={1}>
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle2">
            {name}
            <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
              ({addressType})
            </Box>
          </Typography>

          {primary && (
            <Label color="info" sx={{ ml: 1 }}>
              Default
            </Label>
          )}
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {fullAddress}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {phoneNumber}
        </Typography>
      </Stack>

      {action && action}
    </Stack>
  );
}

AddressItem.propTypes = {
  action: PropTypes.node,
  address: PropTypes.object,
  sx: PropTypes.object,
};
