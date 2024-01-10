import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function JobDetailsCandidates({ candidates }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {candidates.map((candidate) => (
        <Stack component={Card} direction="row" spacing={2} key={candidate.id} sx={{ p: 3 }}>
          <IconButton sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>

          <Avatar alt={candidate.name} src={candidate.avatarUrl} sx={{ width: 48, height: 48 }} />

          <Stack spacing={2}>
            <ListItemText
              primary={candidate.name}
              secondary={candidate.role}
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

              <Tooltip title="Download CV">
                <IconButton
                  size="small"
                  color="secondary"
                  sx={{
                    borderRadius: 1,
                    bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.16),
                    },
                  }}
                >
                  <Iconify width={18} icon="eva:cloud-download-fill" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
}

JobDetailsCandidates.propTypes = {
  candidates: PropTypes.array,
};
