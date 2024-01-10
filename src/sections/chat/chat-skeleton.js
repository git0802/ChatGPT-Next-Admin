import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

export function ChatNavItemSkeleton({ sx, ...other }) {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{
        px: 2.5,
        py: 1.5,
        ...sx,
      }}
      {...other}
    >
      <Skeleton variant="circular" sx={{ width: 48, height: 48 }} />

      <Stack spacing={1} flexGrow={1}>
        <Skeleton sx={{ width: 0.75, height: 10 }} />
        <Skeleton sx={{ width: 0.5, height: 10 }} />
      </Stack>
    </Stack>
  );
}

ChatNavItemSkeleton.propTypes = {
  sx: PropTypes.object,
};
