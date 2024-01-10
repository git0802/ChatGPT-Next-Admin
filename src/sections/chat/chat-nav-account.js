import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Badge, { badgeClasses } from '@mui/material/Badge';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function ChatNavAccount() {
  const { user } = useMockedUser();

  const popover = usePopover();

  const [status, setStatus] = useState('online');

  const handleChangeStatus = useCallback((event) => {
    setStatus(event.target.value);
  }, []);

  return (
    <>
      <Badge variant={status} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          onClick={popover.onOpen}
          sx={{ cursor: 'pointer', width: 48, height: 48 }}
        />
      </Badge>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="top-left" sx={{ p: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,
          }}
        >
          <ListItemText
            primary={user?.displayName}
            secondary={user?.email}
            secondaryTypographyProps={{ component: 'span' }}
          />

          <Tooltip title="Log out">
            <IconButton color="error">
              <Iconify icon="ic:round-power-settings-new" />
            </IconButton>
          </Tooltip>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem>
            <Badge
              variant={status}
              sx={{
                [`& .${badgeClasses.badge}`]: {
                  position: 'static',
                  m: 0.75,
                  width: 12,
                  height: 12,
                  flexShrink: 0,
                },
              }}
            />

            <Select
              native
              fullWidth
              value={status}
              onChange={handleChangeStatus}
              input={<InputBase sx={{ pl: 2 }} />}
              inputProps={{
                sx: { textTransform: 'capitalize' },
              }}
            >
              {['online', 'alway', 'busy', 'offline'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </MenuItem>

          <MenuItem>
            <Iconify icon="solar:user-id-bold" width={24} />
            Profile
          </MenuItem>

          <MenuItem>
            <Iconify icon="eva:settings-2-fill" width={24} />
            Settings
          </MenuItem>
        </Stack>
      </CustomPopover>
    </>
  );
}
