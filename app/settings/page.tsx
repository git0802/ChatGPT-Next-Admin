"use client";

import BackdropPage from "@/components/Backdrop/Backdrop";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import KeyIcon from "@mui/icons-material/Key";
import DeleteIcon from "@mui/icons-material/Delete";
// import DatasetIcon from "@mui/icons-material/Dataset";

import React, { useEffect, useState } from "react";
import ApikeyDialog from "@/components/Dialog/ApikeyDialog";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

const Setting = () => {
  const [openaiKey, setOpenaiKey] = useState("");
  const [mistralKey, setMistralKey] = useState("");
  const [limit, setLimit] = useState<Number>(0);
  const [redirectURL, setRedirectURL] = useState("");

  const [snackbarMessage, setSnackbarMessage] = useState<boolean>();

  const [backdropStatus, setBackdropStatus] = useState<boolean>(false);
  const [snackbarStatus, setSnackbarStatus] = useState<boolean>(false);

  const [openaiModalStatus, setOpenaiModalStatus] = useState<boolean>(false);
  const [openaiEditModalStatus, setOpenaiEditModalStatus] =
    useState<boolean>(false);

  const [mistralModalStatus, setMistralModalStatus] = useState<boolean>(false);
  const [mistralEditModalStatus, setMistralEditModalStatus] =
    useState<boolean>(false);

  const [limitError, setLimitError] = useState<boolean>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async () => {
    handleBackdropOpen();
    try {
      const { data } = await axios.get("/api/setting");

      for (let i = 0; i < data.length; i++) {
        if (data[i].id === "default") {
          setOpenaiKey(data[i].apikey);
          setMistralKey(data[i].mistralapikey);
          setLimit(data[i].limit);
          setRedirectURL(data[i].redirectURL);
        }
      }

      handleBackdropClose();
    } catch (error) {
      console.error(error);
      handleBackdropClose();
    }
  };

  const showKey = (key: string) => {
    const truncatedKey = key.slice(0, 3) + "..." + key.slice(-4);
    return truncatedKey;
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueAsNumber = Number(event.target.value);
    setLimitError(false);

    if (!isNaN(valueAsNumber)) {
      setLimit(valueAsNumber);
    } else {
      setLimit(0);
    }
  };

  const handleRedirectURLChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valueAsURL = String(event.target.value);

    setRedirectURL(valueAsURL);
  };

  const handleRedirectURLSet = async () => {
    try {
      const data = {
        id: "default",
        redirectURL: redirectURL,
      };

      const response = await axios.post("api/setting", data);
      setSnackbarMessage(true);
      handleSnackbarOpen();
      console.log("Response: ", response);
    } catch (error) {
      setSnackbarMessage(false);
      handleSnackbarOpen();
      console.error(error);
    }
  };

  const handleRedirectURLClear = async () => {
    try {
      const data = {
        id: "default",
        redirectURL: "",
      };

      const response = await axios.post("api/setting", data);

      setRedirectURL("");

      console.log("Response: ", response);
    } catch (error) {
      console.error("Errors: ", error);
    }
  };

  const handleLimitSet = async () => {
    setIsLoading(true);
    try {
      const data = {
        id: "default",
        limit: limit,
      };
      const response = await axios.post("/api/setting", data);
      setIsLoading(false);
      setSnackbarMessage(true);
      handleSnackbarOpen();

      console.log("Response: ", response);
    } catch (error) {
      setIsLoading(false);
      setSnackbarMessage(false);
      handleSnackbarOpen();
      console.error(error);
    }
  };

  const handleOpenaikeyClear = async () => {
    try {
      const data = {
        id: "default",
        apikey: "",
      };

      const response = await axios.post("/api/setting", data);

      setOpenaiKey("");
      console.log("Response:", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMistralkeyClear = async () => {
    try {
      const data = {
        id: "default",
        mistralapikey: "",
      };

      const response = await axios.post("/api/setting", data);

      setMistralKey("");
      console.log("Response:", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackdropClose = () => {
    setBackdropStatus(false);
  };

  const handleBackdropOpen = () => {
    setBackdropStatus(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarStatus(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarStatus(true);
  };

  const handleOpenaiModalOpen = () => {
    setOpenaiModalStatus(true);
  };

  const handleOpenaiModalClose = () => {
    setOpenaiModalStatus(false);
  };

  const handleOpenaiEditModalOpen = () => {
    setOpenaiEditModalStatus(true);
  };

  const handleOpenaiEditModalClose = () => {
    setOpenaiEditModalStatus(false);
  };

  const handleMistralModalOpen = () => {
    setMistralModalStatus(true);
  };

  const handleMistralModalClose = () => {
    setMistralModalStatus(false);
  };

  const handleMistralEditModalOpen = () => {
    setMistralEditModalStatus(true);
  };

  const handleMistralEditModalClose = () => {
    setMistralEditModalStatus(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Setting" />

      <BackdropPage open={backdropStatus} handleClose={handleBackdropClose} />

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarStatus}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbarMessage ? "success" : "warning"}>
          {snackbarMessage ? "Save Success!" : "Save faild!"}
        </Alert>
      </Snackbar>

      <ApikeyDialog
        open={openaiModalStatus}
        onClose={handleOpenaiModalClose}
        title="Set your OpenAI API Key"
        apikey={openaiKey}
        setApiKey={setOpenaiKey}
        content="OpenAI"
      />

      <ApikeyDialog
        open={openaiEditModalStatus}
        onClose={handleOpenaiEditModalClose}
        title="Edit your OpenAI API Key"
        apikey={openaiKey}
        setApiKey={setOpenaiKey}
        content="OpenAI"
      />

      <ApikeyDialog
        open={mistralModalStatus}
        onClose={handleMistralModalClose}
        title="Set your Mistral AI API Key"
        apikey={mistralKey}
        setApiKey={setMistralKey}
        content="Mistral AI"
      />

      <ApikeyDialog
        open={mistralEditModalStatus}
        onClose={handleMistralEditModalClose}
        title="Edit your Mistral AI API Key"
        apikey={mistralKey}
        setApiKey={setMistralKey}
        content="Mistral AI"
      />

      <div className="w-full gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-4 border-b border-stroke px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Default Values Setting
              </h3>
            </div>
            <div className="p-7">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2 flex flex-col gap-5.5 ">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="30px"
                  >
                    <Stack>
                      <Typography variant="subtitle1" gutterBottom>
                        Product Link:
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        value={redirectURL}
                        type="text"
                        id="redirectURL"
                        variant="outlined"
                        placeholder="Redirect URL"
                        onChange={handleRedirectURLChange}
                        fullWidth
                        required
                        size="small"
                        sx={{ width: "100%" }}
                      />
                      <IconButton onClick={handleRedirectURLClear}>
                        <DeleteIcon />
                      </IconButton>
                      <Button
                        variant="contained"
                        onClick={handleRedirectURLSet}
                      >
                        SET
                      </Button>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: "350px" }}
                  >
                    <Stack>
                      <Typography variant="subtitle1" gutterBottom>
                        OpenAI API Key:
                      </Typography>
                    </Stack>
                    <Stack>
                      {!openaiKey ? (
                        <>
                          <Button
                            type="submit"
                            startIcon={<KeyIcon />}
                            variant="contained"
                            sx={{ width: "185px" }}
                            onClick={handleOpenaiModalOpen}
                          >
                            Submit
                          </Button>
                        </>
                      ) : (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="subtitle2" gutterBottom>
                            {showKey(openaiKey)}
                          </Typography>
                          <IconButton onClick={handleOpenaikeyClear}>
                            <DeleteIcon />
                          </IconButton>
                          <Button
                            variant="contained"
                            onClick={handleOpenaiEditModalOpen}
                          >
                            Edit
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: "350px" }}
                  >
                    <Stack>
                      <Typography variant="subtitle1" gutterBottom>
                        Mistral AI API Key:
                      </Typography>
                    </Stack>
                    <Stack>
                      {!mistralKey ? (
                        <>
                          <Button
                            type="submit"
                            startIcon={<KeyIcon />}
                            variant="contained"
                            sx={{ width: "185px" }}
                            onClick={handleMistralModalOpen}
                          >
                            Submit
                          </Button>
                        </>
                      ) : (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="subtitle2" gutterBottom>
                            {showKey(mistralKey)}
                          </Typography>
                          <IconButton onClick={handleMistralkeyClear}>
                            <DeleteIcon />
                          </IconButton>
                          <Button
                            variant="contained"
                            onClick={handleMistralEditModalOpen}
                          >
                            Edit
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: "350px" }}
                  >
                    <Stack>
                      <Typography variant="subtitle1" gutterBottom>
                        Free Tier Limit:
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <TextField
                        value={limit}
                        type="number"
                        id="limit"
                        variant="outlined"
                        placeholder="Limits"
                        onChange={handleLimitChange}
                        fullWidth
                        required
                        size="small"
                        error={limitError}
                        helperText={
                          limitError
                            ? "Please submit free tier limits value"
                            : ""
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          min: 0,
                        }}
                        sx={{ width: "113px" }}
                      />
                      <LoadingButton
                        type="submit"
                        // startIcon={<DatasetIcon />}
                        variant="contained"
                        loading={isLoading}
                        onClick={handleLimitSet}
                      >
                        Set
                      </LoadingButton>
                    </Stack>
                  </Stack>
                </div>
                <div className="w-full sm:w-1/2 flex flex-row gap-5.5 items-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
