import { useEffect, useState } from "react";

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

export default function ApikeyDialog(props: any) {
  const { open, onClose, title, apikey, setApiKey, content } = props;

  const [childapikey, setChildApikey] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${childapikey}`,
  };

  const bodyData = {
    model: "mistral-medium",
    messages: [
      {
        role: "user",
        content: "Hi",
      },
    ],
  };

  const openaiBody = {
    headers: headers,
  };

  const mistralBody = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(bodyData),
  };

  const handleSubmit = () => {
    setIsLoading(true);
    fetch(
      content === "OpenAI"
        ? "https://api.openai.com/v1/engines"
        : "https://api.mistral.ai/v1/chat/completions",
      content === "OpenAI" ? openaiBody : mistralBody
    )
      .then((res) => {
        if (res.ok) {
          saveApikey(childapikey);
          setApiKey(childapikey);
          setIsLoading(false);
          setChildApikey("");
          onClose();
        } else {
          setIsLoading(false);
          setErrorStatus(true);
          setChildApikey("");
        }
      })
      .catch((error) => {
        console.error("Error checking API Key: ", error);

        setIsLoading(false);
        setErrorStatus(true);
        setChildApikey("");
      });
  };

  const saveApikey = async (key: string) => {
    try {
      let data = {};

      if (content === "OpenAI") {
        data = {
          id: "default",
          apikey: key,
        };
      } else {
        data = {
          id: "default",
          mistralapikey: key,
        };
      }

      const response = await axios.post("/api/setting", data);

      console.log("Response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setChildApikey(apikey);
  }, []);

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Stack spacing={1.5}>
          <Alert severity={errorStatus ? "error" : "info"} variant="outlined">
            {errorStatus
              ? "API key is invalid or expired."
              : "This will set the API key for everyone"}
          </Alert>

          <TextField
            fullWidth
            value={childapikey}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setChildApikey(event.target.value);
            }}
            placeholder={`New ${content} API Key`}
            size="small"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <LoadingButton
          variant="contained"
          color="success"
          disabled={!childapikey}
          loading={isLoading}
          onClick={handleSubmit}
        >
          Set Key
        </LoadingButton>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
