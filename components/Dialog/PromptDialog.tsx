import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function PromptDialog(props: any) {
  const {
    dialogTitle,
    buttonText,
    title,
    content,
    email,
    status,
    closeModal,
    handelTitleChange,
    handelContentChange,
    handelPrompt,
    titleError,
    contentError,
  } = props;
  return (
    <>
      <Dialog
        fullWidth
        maxWidth={false}
        open={status}
        onClose={closeModal}
        PaperProps={{
          sx: { maxWidth: 500 },
        }}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>

        <DialogContent>
          <Stack spacing={3}>
            {email && (
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Email</Typography>
                <TextField value={email} name="email" disabled />
              </Stack>
            )}
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Title</Typography>
              <TextField
                value={title}
                name="title"
                placeholder="Prompt Title"
                label="Title"
                onChange={handelTitleChange}
                multiline
                maxRows={3}
                required
                error={titleError}
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <TextField
                value={content}
                name="content"
                multiline
                placeholder="Prompt Content"
                minRows={10}
                maxRows={20}
                label="Content"
                onChange={handelContentChange}
                required
                error={contentError}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={handelPrompt}>
            {buttonText}
          </Button>
          <Button variant="outlined" color="inherit" onClick={closeModal}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
