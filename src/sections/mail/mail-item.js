import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

// ----------------------------------------------------------------------

export default function MailItem({ mail, selected, sx, ...other }) {
  return (
    <ListItemButton
      sx={{
        p: 1,
        mb: 0.5,
        borderRadius: 1,
        ...(selected && {
          bgcolor: 'action.selected',
        }),
        ...sx,
      }}
      {...other}
    >
      <Avatar
        alt={mail.from.name}
        src={mail.from.avatarUrl ? `${mail.from.avatarUrl}` : ''}
        sx={{ mr: 2 }}
      >
        {mail.from.name.charAt(0).toUpperCase()}
      </Avatar>

      <>
        <ListItemText
          primary={mail.from.name}
          primaryTypographyProps={{
            noWrap: true,
            variant: 'subtitle2',
          }}
          secondary={mail.message}
          secondaryTypographyProps={{
            noWrap: true,
            component: 'span',
            variant: mail.isUnread ? 'subtitle2' : 'body2',
            color: mail.isUnread ? 'text.primary' : 'text.secondary',
          }}
        />

        <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
          <Typography
            noWrap
            variant="body2"
            component="span"
            sx={{
              mb: 1.5,
              fontSize: 12,
              color: 'text.disabled',
            }}
          >
            {formatDistanceToNowStrict(new Date(mail.createdAt), {
              addSuffix: false,
            })}
          </Typography>

          {!!mail.isUnread && (
            <Box
              sx={{
                bgcolor: 'info.main',
                width: 8,
                height: 8,
                borderRadius: '50%',
              }}
            />
          )}
        </Stack>
      </>
    </ListItemButton>
  );
}

MailItem.propTypes = {
  mail: PropTypes.object,
  selected: PropTypes.bool,
  sx: PropTypes.object,
};
