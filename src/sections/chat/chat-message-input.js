import { sub } from 'date-fns';
import PropTypes from 'prop-types';
import { useRef, useMemo, useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import uuidv4 from 'src/utils/uuidv4';

import { sendMessage, createConversation } from 'src/api/chat';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ChatMessageInput({
  recipients,
  onAddRecipients,
  //
  disabled,
  selectedConversationId,
}) {
  const router = useRouter();

  const { user } = useMockedUser();

  const fileRef = useRef(null);

  const [message, setMessage] = useState('');

  const myContact = useMemo(
    () => ({
      id: `${user?.id}`,
      role: `${user?.role}`,
      email: `${user?.email}`,
      address: `${user?.address}`,
      name: `${user?.displayName}`,
      lastActivity: new Date(),
      avatarUrl: `${user?.photoURL}`,
      phoneNumber: `${user?.phoneNumber}`,
      status: 'online',
    }),
    [user]
  );

  const messageData = useMemo(
    () => ({
      id: uuidv4(),
      attachments: [],
      body: message,
      contentType: 'text',
      createdAt: sub(new Date(), { minutes: 1 }),
      senderId: myContact.id,
    }),
    [message, myContact.id]
  );

  const conversationData = useMemo(
    () => ({
      id: uuidv4(),
      messages: [messageData],
      participants: [...recipients, myContact],
      type: recipients.length > 1 ? 'GROUP' : 'ONE_TO_ONE',
      unreadCount: 0,
    }),
    [messageData, myContact, recipients]
  );

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const handleChangeMessage = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  const handleSendMessage = useCallback(
    async (event) => {
      try {
        if (event.key === 'Enter') {
          if (message) {
            if (selectedConversationId) {
              await sendMessage(selectedConversationId, messageData);
            } else {
              const res = await createConversation(conversationData);

              router.push(`${paths.dashboard.chat}?id=${res.conversation.id}`);

              onAddRecipients([]);
            }
          }
          setMessage('');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [conversationData, message, messageData, onAddRecipients, router, selectedConversationId]
  );

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleSendMessage}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        disabled={disabled}
        startAdornment={
          <IconButton>
            <Iconify icon="eva:smiling-face-fill" />
          </IconButton>
        }
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton onClick={handleAttach}>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>
            <IconButton onClick={handleAttach}>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
            <IconButton>
              <Iconify icon="solar:microphone-bold" />
            </IconButton>
          </Stack>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </>
  );
}

ChatMessageInput.propTypes = {
  disabled: PropTypes.bool,
  onAddRecipients: PropTypes.func,
  recipients: PropTypes.array,
  selectedConversationId: PropTypes.string,
};
