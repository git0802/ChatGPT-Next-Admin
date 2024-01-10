import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, darken, lighten } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDateTime } from 'src/utils/format-time';

import Label from 'src/components/label';
import Editor from 'src/components/editor';
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import Scrollbar from 'src/components/scrollbar';
import TextMaxLine from 'src/components/text-max-line';
import EmptyContent from 'src/components/empty-content';
import FileThumbnail from 'src/components/file-thumbnail';

// ----------------------------------------------------------------------

export default function MailDetails({ mail, renderLabel }) {
  const showAttachments = useBoolean(true);

  if (!mail) {
    return (
      <EmptyContent
        title="No Conversation Selected"
        description="Select a conversation to read"
        imgUrl="/assets/icons/empty/ic_email_selected.svg"
        sx={{
          borderRadius: 1.5,
          bgcolor: 'background.default',
        }}
      />
    );
  }

  const renderHead = (
    <Stack direction="row" alignItems="center" flexShrink={0} sx={{ height: 56, pl: 2, pr: 1 }}>
      <Stack direction="row" spacing={1} flexGrow={1}>
        {mail.labelIds.map((labelId) => {
          const label = renderLabel(labelId);

          return label ? (
            <Label
              key={label.id}
              sx={{
                bgcolor: alpha(label.color, 0.16),
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? darken(label.color, 0.24)
                    : lighten(label.color, 0.24),
              }}
            >
              {label.name}
            </Label>
          ) : null;
        })}
      </Stack>

      <Stack direction="row" alignItems="center">
        <Checkbox
          color="warning"
          icon={<Iconify icon="eva:star-outline" />}
          checkedIcon={<Iconify icon="eva:star-fill" />}
          checked={mail.isStarred}
        />

        <Checkbox
          color="warning"
          icon={<Iconify icon="material-symbols:label-important-rounded" />}
          checkedIcon={<Iconify icon="material-symbols:label-important-rounded" />}
          checked={mail.isImportant}
        />

        <Tooltip title="Archive">
          <IconButton>
            <Iconify icon="solar:archive-down-minimlistic-bold" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Mark Unread">
          <IconButton>
            <Iconify icon="fluent:mail-unread-20-filled" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Trash">
          <IconButton>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>

        <IconButton>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>
    </Stack>
  );

  const renderSubject = (
    <Stack spacing={2} direction="row" flexShrink={0} sx={{ p: 2 }}>
      <TextMaxLine variant="subtitle2" sx={{ flexGrow: 1 }}>
        Re: {mail.subject}
      </TextMaxLine>

      <Stack spacing={0.5}>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <IconButton size="small">
            <Iconify width={18} icon="solar:reply-bold" />
          </IconButton>

          <IconButton size="small">
            <Iconify width={18} icon="solar:multiple-forward-left-broken" />
          </IconButton>

          <IconButton size="small">
            <Iconify width={18} icon="solar:forward-bold" />
          </IconButton>
        </Stack>

        <Typography variant="caption" noWrap sx={{ color: 'text.disabled' }}>
          {fDateTime(mail.createdAt)}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderSender = (
    <Stack
      flexShrink={0}
      direction="row"
      alignItems="center"
      sx={{
        p: (theme) => theme.spacing(2, 2, 1, 2),
      }}
    >
      <Avatar
        alt={mail.from.name}
        src={mail.from.avatarUrl ? `${mail.from.avatarUrl}` : ''}
        sx={{ mr: 2 }}
      >
        {mail.from.name.charAt(0).toUpperCase()}
      </Avatar>

      <ListItemText
        primary={
          <>
            {mail.from.name}
            <Box component="span" sx={{ typography: 'body2', color: 'text.disabled' }}>
              {` <${mail.from.email}>`}
            </Box>
          </>
        }
        secondary={
          <>
            {`To: `}
            {mail.to.map((person) => (
              <Link key={person.email} sx={{ color: 'text.secondary' }}>
                {`${person.email}, `}
              </Link>
            ))}
          </>
        }
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: true,
          component: 'span',
          typography: 'caption',
        }}
      />
    </Stack>
  );

  const renderAttachments = (
    <Stack
      spacing={1}
      sx={{
        p: 1,
        borderRadius: 1,
        bgcolor: 'background.neutral',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ButtonBase
          onClick={showAttachments.onToggle}
          sx={{
            color: 'text.secondary',
            typography: 'caption',
            borderRadius: 0.5,
          }}
        >
          <Iconify icon="eva:attach-2-fill" sx={{ mr: 0.5 }} />
          {mail.attachments.length} attachments
          <Iconify
            icon={
              showAttachments.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'
            }
            width={16}
            sx={{ ml: 0.5 }}
          />
        </ButtonBase>

        <Button startIcon={<Iconify icon="eva:cloud-download-fill" />}>Download</Button>
      </Stack>

      <Collapse in={showAttachments.value} unmountOnExit timeout="auto">
        <Stack direction="row" flexWrap="wrap" spacing={1}>
          {mail.attachments.map((attachment) => (
            <Stack
              key={attachment.id}
              alignItems="center"
              justifyContent="center"
              sx={{
                width: 40,
                height: 40,
                flexShrink: 0,
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: 'background.neutral',
              }}
            >
              <FileThumbnail
                tooltip
                imageView
                file={attachment.preview}
                onDownload={() => console.info('DOWNLOAD')}
                sx={{ width: 24, height: 24 }}
              />
            </Stack>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );

  const renderContent = (
    <Box
      sx={{
        py: 3,
        flexGrow: 1,
        overflow: { xs: 'auto', md: 'hidden' },
      }}
    >
      <Scrollbar>
        <Markdown
          children={mail.message}
          sx={{
            px: 2,
            '& p': {
              typography: 'body2',
            },
          }}
        />
      </Scrollbar>
    </Box>
  );

  const renderEditor = (
    <Stack
      spacing={2}
      sx={{
        p: (theme) => theme.spacing(0, 2, 2, 2),
      }}
    >
      <Editor simple id="reply-mail" />

      <Stack direction="row" alignItems="center">
        <Stack direction="row" alignItems="center" flexGrow={1}>
          <IconButton>
            <Iconify icon="solar:gallery-add-bold" />
          </IconButton>

          <IconButton>
            <Iconify icon="eva:attach-2-fill" />
          </IconButton>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          endIcon={<Iconify icon="iconamoon:send-fill" />}
        >
          Send
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <Stack
      flexGrow={1}
      sx={{
        width: 1,
        minWidth: 0,
        borderRadius: 1.5,
        bgcolor: 'background.default',
      }}
    >
      {renderHead}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderSubject}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderSender}

      {!!mail.attachments.length && <Stack sx={{ px: 2 }}> {renderAttachments} </Stack>}

      {renderContent}

      {renderEditor}
    </Stack>
  );
}

MailDetails.propTypes = {
  mail: PropTypes.object,
  renderLabel: PropTypes.func,
};
