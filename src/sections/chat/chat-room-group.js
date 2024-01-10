import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import ChatRoomParticipantDialog from './chat-room-participant-dialog';

// ----------------------------------------------------------------------

export default function ChatRoomGroup({ participants }) {
  const [selected, setSelected] = useState(null);

  const collapse = useBoolean(true);

  const handleOpen = useCallback((participant) => {
    setSelected(participant);
  }, []);

  const handleClose = () => {
    setSelected(null);
  };

  const totalParticipants = participants.length;

  const renderBtn = (
    <ListItemButton
      onClick={collapse.onToggle}
      sx={{
        pl: 2.5,
        pr: 1.5,
        height: 40,
        flexShrink: 0,
        flexGrow: 'unset',
        typography: 'overline',
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Box component="span" sx={{ flexGrow: 1 }}>
        In room ({totalParticipants})
      </Box>
      <Iconify
        width={16}
        icon={collapse.value ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      />
    </ListItemButton>
  );

  const renderContent = (
    <Scrollbar sx={{ height: 56 * 4 }}>
      {participants.map((participant) => (
        <ListItemButton key={participant.id} onClick={() => handleOpen(participant)}>
          <Badge
            variant={participant.status}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar alt={participant.name} src={participant.avatarUrl} />
          </Badge>

          <ListItemText
            sx={{ ml: 2 }}
            primary={participant.name}
            secondary={participant.role}
            primaryTypographyProps={{
              noWrap: true,
              typography: 'subtitle2',
            }}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              typography: 'caption',
            }}
          />
        </ListItemButton>
      ))}
    </Scrollbar>
  );

  return (
    <>
      {renderBtn}

      <div>
        <Collapse in={collapse.value}>{renderContent}</Collapse>
      </div>

      {selected && (
        <ChatRoomParticipantDialog participant={selected} open={!!selected} onClose={handleClose} />
      )}
    </>
  );
}

ChatRoomGroup.propTypes = {
  participants: PropTypes.array,
};
