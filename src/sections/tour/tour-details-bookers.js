import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function TourDetailsBookers({ bookers }) {
  const [approved, setApproved] = useState([]);

  const handleClick = useCallback(
    (item) => {
      const selected = approved.includes(item)
        ? approved.filter((value) => value !== item)
        : [...approved, item];

      setApproved(selected);
    },
    [approved]
  );

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {bookers.map((booker) => (
        <BookerItem
          key={booker.id}
          booker={booker}
          selected={approved.includes(booker.id)}
          onSelected={() => handleClick(booker.id)}
        />
      ))}
    </Box>
  );
}

TourDetailsBookers.propTypes = {
  bookers: PropTypes.array,
};

// ----------------------------------------------------------------------

function BookerItem({ booker, selected, onSelected }) {
  return (
    <Stack component={Card} direction="row" spacing={2} key={booker.id} sx={{ p: 3 }}>
      <Avatar alt={booker.name} src={booker.avatarUrl} sx={{ width: 48, height: 48 }} />

      <Stack spacing={2} flexGrow={1}>
        <ListItemText
          primary={booker.name}
          secondary={
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Iconify icon="solar:users-group-rounded-bold" width={16} />
              {booker.guests} guests
            </Stack>
          }
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
            color: 'text.disabled',
          }}
        />

        <Stack spacing={1} direction="row">
          <IconButton
            size="small"
            color="error"
            sx={{
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
              },
            }}
          >
            <Iconify width={18} icon="solar:phone-bold" />
          </IconButton>

          <IconButton
            size="small"
            color="info"
            sx={{
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.info.main, 0.16),
              },
            }}
          >
            <Iconify width={18} icon="solar:chat-round-dots-bold" />
          </IconButton>

          <IconButton
            size="small"
            color="primary"
            sx={{
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
              },
            }}
          >
            <Iconify width={18} icon="fluent:mail-24-filled" />
          </IconButton>
        </Stack>
      </Stack>

      <Button
        size="small"
        variant={selected ? 'text' : 'outlined'}
        color={selected ? 'success' : 'inherit'}
        startIcon={
          selected ? <Iconify width={18} icon="eva:checkmark-fill" sx={{ mr: -0.75 }} /> : null
        }
        onClick={onSelected}
      >
        {selected ? 'Approved' : 'Approve'}
      </Button>
    </Stack>
  );
}

BookerItem.propTypes = {
  booker: PropTypes.object,
  onSelected: PropTypes.func,
  selected: PropTypes.bool,
};
