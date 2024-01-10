import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomDateRangePicker, { useDateRangePicker } from 'src/components/custom-date-range-picker';

import KanbanInputName from './kanban-input-name';
import KanbanDetailsToolbar from './kanban-details-toolbar';
import KanbanContactsDialog from './kanban-contacts-dialog';
import KanbanDetailsPriority from './kanban-details-priority';
import KanbanDetailsAttachments from './kanban-details-attachments';
import KanbanDetailsCommentList from './kanban-details-comment-list';
import KanbanDetailsCommentInput from './kanban-details-comment-input';

// ----------------------------------------------------------------------

const StyledLabel = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  width: 100,
  flexShrink: 0,
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightSemiBold,
}));

// ----------------------------------------------------------------------

export default function KanbanDetails({
  task,
  openDetails,
  onCloseDetails,
  //
  onUpdateTask,
  onDeleteTask,
}) {
  const [priority, setPriority] = useState(task.priority);

  const [taskName, setTaskName] = useState(task.name);

  const like = useBoolean();

  const contacts = useBoolean();

  const [taskDescription, setTaskDescription] = useState(task.description);

  const rangePicker = useDateRangePicker(task.due[0], task.due[1]);

  const handleChangeTaskName = useCallback((event) => {
    setTaskName(event.target.value);
  }, []);

  const handleUpdateTask = useCallback(
    (event) => {
      try {
        if (event.key === 'Enter') {
          if (taskName) {
            onUpdateTask({
              ...task,
              name: taskName,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [onUpdateTask, task, taskName]
  );

  const handleChangeTaskDescription = useCallback((event) => {
    setTaskDescription(event.target.value);
  }, []);

  const handleChangePriority = useCallback((newValue) => {
    setPriority(newValue);
  }, []);

  const renderHead = (
    <KanbanDetailsToolbar
      liked={like.value}
      taskName={task.name}
      onLike={like.onToggle}
      onDelete={onDeleteTask}
      taskStatus={task.status}
      onCloseDetails={onCloseDetails}
    />
  );

  const renderName = (
    <KanbanInputName
      placeholder="Task name"
      value={taskName}
      onChange={handleChangeTaskName}
      onKeyUp={handleUpdateTask}
    />
  );

  const renderReporter = (
    <Stack direction="row" alignItems="center">
      <StyledLabel>Reporter</StyledLabel>
      <Avatar alt={task.reporter.name} src={task.reporter.avatarUrl} />
    </Stack>
  );

  const renderAssignee = (
    <Stack direction="row">
      <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>Assignee</StyledLabel>

      <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
        {task.assignee.map((user) => (
          <Avatar key={user.id} alt={user.name} src={user.avatarUrl} />
        ))}

        <Tooltip title="Add assignee">
          <IconButton
            onClick={contacts.onTrue}
            sx={{
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon="mingcute:add-line" />
          </IconButton>
        </Tooltip>

        <KanbanContactsDialog
          assignee={task.assignee}
          open={contacts.value}
          onClose={contacts.onFalse}
        />
      </Stack>
    </Stack>
  );

  const renderLabel = (
    <Stack direction="row">
      <StyledLabel sx={{ height: 24, lineHeight: '24px' }}>Labels</StyledLabel>

      {!!task.labels.length && (
        <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
          {task.labels.map((label) => (
            <Chip key={label} color="info" label={label} size="small" variant="soft" />
          ))}
        </Stack>
      )}
    </Stack>
  );

  const renderDueDate = (
    <Stack direction="row" alignItems="center">
      <StyledLabel> Due date </StyledLabel>

      {rangePicker.selected ? (
        <Button size="small" onClick={rangePicker.onOpen}>
          {rangePicker.shortLabel}
        </Button>
      ) : (
        <Tooltip title="Add due date">
          <IconButton
            onClick={rangePicker.onOpen}
            sx={{
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon="mingcute:add-line" />
          </IconButton>
        </Tooltip>
      )}

      <CustomDateRangePicker
        variant="calendar"
        title="Choose due date"
        startDate={rangePicker.startDate}
        endDate={rangePicker.endDate}
        onChangeStartDate={rangePicker.onChangeStartDate}
        onChangeEndDate={rangePicker.onChangeEndDate}
        open={rangePicker.open}
        onClose={rangePicker.onClose}
        selected={rangePicker.selected}
        error={rangePicker.error}
      />
    </Stack>
  );

  const renderPriority = (
    <Stack direction="row" alignItems="center">
      <StyledLabel>Priority</StyledLabel>

      <KanbanDetailsPriority priority={priority} onChangePriority={handleChangePriority} />
    </Stack>
  );

  const renderDescription = (
    <Stack direction="row">
      <StyledLabel> Description </StyledLabel>

      <TextField
        fullWidth
        multiline
        size="small"
        value={taskDescription}
        onChange={handleChangeTaskDescription}
        InputProps={{
          sx: { typography: 'body2' },
        }}
      />
    </Stack>
  );

  const renderAttachments = (
    <Stack direction="row">
      <StyledLabel>Attachments</StyledLabel>
      <KanbanDetailsAttachments attachments={task.attachments} />
    </Stack>
  );

  const renderComments = <KanbanDetailsCommentList comments={task.comments} />;

  return (
    <Drawer
      open={openDetails}
      onClose={onCloseDetails}
      anchor="right"
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: {
            xs: 1,
            sm: 480,
          },
        },
      }}
    >
      {renderHead}

      <Divider />

      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': {
            height: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            pt: 3,
            pb: 5,
            px: 2.5,
          }}
        >
          {renderName}

          {renderReporter}

          {renderAssignee}

          {renderLabel}

          {renderDueDate}

          {renderPriority}

          {renderDescription}

          {renderAttachments}
        </Stack>

        {!!task.comments.length && renderComments}
      </Scrollbar>

      <KanbanDetailsCommentInput />
    </Drawer>
  );
}

KanbanDetails.propTypes = {
  onCloseDetails: PropTypes.func,
  onDeleteTask: PropTypes.func,
  onUpdateTask: PropTypes.func,
  openDetails: PropTypes.bool,
  task: PropTypes.object,
};
