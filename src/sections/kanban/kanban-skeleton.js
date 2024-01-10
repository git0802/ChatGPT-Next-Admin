import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

export function KanbanColumnSkeleton({ index, sx, ...other }) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={2} sx={{ width: 280 }}>
        <Skeleton sx={{ paddingTop: '75%', borderRadius: 1.5 }} />
        {[0].includes(Number(index)) && <Skeleton sx={{ paddingTop: '50%', borderRadius: 1.5 }} />}
        {[0, 1].includes(Number(index)) && (
          <Skeleton sx={{ paddingTop: '25%', borderRadius: 1.5 }} />
        )}
        {[0, 1, 2].includes(Number(index)) && (
          <Skeleton sx={{ paddingTop: '25%', borderRadius: 1.5 }} />
        )}
      </Stack>
    </Stack>
  );
}

KanbanColumnSkeleton.propTypes = {
  index: PropTypes.number,
  sx: PropTypes.object,
};
