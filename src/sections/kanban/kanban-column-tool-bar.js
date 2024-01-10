import PropTypes from 'prop-types';
import { useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import KanbanInputName from './kanban-input-name';

// ----------------------------------------------------------------------

export default function KanbanColumnToolBar({
  columnName,
  onDeleteColumn,
  onClearColumn,
  onUpdateColumn,
}) {
  const renameRef = useRef(null);

  const popover = usePopover();

  const confirmDialog = useBoolean();

  const [name, setName] = useState(columnName);

  useEffect(() => {
    if (popover.open) {
      if (renameRef.current) {
        renameRef.current.focus();
      }
    }
  }, [popover.open]);

  const handleChangeName = useCallback((event) => {
    setName(event.target.value);
  }, []);

  const handleKeyUpUpdateColumn = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        if (renameRef.current) {
          renameRef.current.blur();
        }
        onUpdateColumn(name);
      }
    },
    [name, onUpdateColumn]
  );

  return (
    <>
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pt: 3 }}
      >
        <KanbanInputName
          inputRef={renameRef}
          placeholder="Section name"
          value={name}
          onChange={handleChangeName}
          onKeyUp={handleKeyUpUpdateColumn}
        />

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-horizontal-fill" />
        </IconButton>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{
          ml: 1.5,
          width: 160,
        }}
      >
        <MenuItem onClick={popover.onClose}>
          <Iconify icon="solar:pen-bold" />
          Rename
        </MenuItem>

        <MenuItem
          onClick={() => {
            onClearColumn();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eraser-bold" />
          Clear
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirmDialog.value}
        onClose={confirmDialog.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete column?
            <Box sx={{ typography: 'caption', color: 'error.main', mt: 2 }}>
              <strong> NOTE: </strong> All tasks related to this category will also be deleted.
            </Box>
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteColumn();
              confirmDialog.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

KanbanColumnToolBar.propTypes = {
  columnName: PropTypes.string,
  onClearColumn: PropTypes.func,
  onDeleteColumn: PropTypes.func,
  onUpdateColumn: PropTypes.func,
};
