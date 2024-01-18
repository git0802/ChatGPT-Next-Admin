"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import {
  Alert,
  Box,
  Button,
  Grid,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import KeyIcon from "@mui/icons-material/Key";
import SaveIcon from "@mui/icons-material/Save";

import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

import { LoadingButton } from "@mui/lab";

import axios from "axios";

const Settings = () => {
  const [apikey, setApikey] = useState("");
  const [validkey, setValidkey] = useState("");
  const [limit, setLimit] = useState<Number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [statusError, setStatusError] = useState<boolean>();
  const [limitError, setLimitError] = useState<boolean>();
  const [helperText, setHelperText] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<boolean>();

  const checkApikey = (apikey: any) => {
    if (!apikey) {
      setStatusError(true);
      setHelperText("Please submit your OpenAI API Key");
    } else {
      fetch("https://api.openai.com/v1/engines", {
        headers: {
          Authorization: `Bearer ${apikey}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("API key is valid.");
            setStatusError(false);
            setHelperText("API key is valid.");
            setValidkey(apikey);
          } else {
            console.error("API key is invalid or expired.");
            setStatusError(true);
            setHelperText("API key is invalid or expired.");
          }
        })
        .catch((error) => {
          console.error("Error checking API key:", error);
          setStatusError(true);
          setHelperText(`Error checking API key: ${error}`);
        });
    }
  };

  const handleCheck = () => {
    checkApikey(apikey);
  };

  const handelSave = async () => {
    if (!validkey) {
      setStatusError(true);
      setHelperText("Check your OpenAI API Key");
      return;
    }

    if (!limit) {
      setLimitError(true);
      return;
    }

    setLoading(true);

    const data = {
      id: "default",
      apikey,
      limit,
    };

    try {
      const response = await axios.post("/api/setting", data);

      console.log("Response: ", response);

      setSnackbarMessage(true);
      handleSnackbarOpen();
      setValidkey("");
    } catch (error) {
      console.error("Errors: ", error);

      setSnackbarMessage(false);
      handleSnackbarOpen();
      setValidkey("");
    }
    setLoading(false);
  };

  const handleApikeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusError(false);
    setHelperText("");
    setApikey(event.target.value);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueAsNumber = Number(event.target.value);
    setLimitError(false);

    if (!isNaN(valueAsNumber)) {
      setLimit(valueAsNumber);
    } else {
      setLimit(undefined);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };
  return (
    <>
      <Breadcrumb pageName="Settings" />

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        // message={snackbarMessage}
      >
        <Alert severity={snackbarMessage ? "success" : "warning"}>
          {snackbarMessage ? "Save Success!" : "Save faild!"}
        </Alert>
      </Snackbar>

      <div className="w-full gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-4 border-b border-stroke px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                ChatGPT Default Values
              </h3>
            </div>
            <div className="p-7">
              <Box sx={{ width: "100%" }}>
                <Stack spacing={2}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">OpenAI API Key</Typography>
                    <Stack direction="row" spacing={2}>
                      <TextField
                        value={apikey}
                        id="openaikey"
                        variant="outlined"
                        placeholder="Please submit your OpenAI API Key"
                        onChange={handleApikeyChange}
                        fullWidth
                        required
                        size="small"
                        error={statusError}
                        helperText={helperText ? helperText : ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Stack>
                        <Button
                          type="submit"
                          startIcon={<CheckIcon />}
                          variant="contained"
                          onClick={handleCheck}
                        >
                          Check
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">
                      Free Tier Limits Value
                    </Typography>
                    <TextField
                      value={limit}
                      type="number"
                      id="limit"
                      variant="outlined"
                      placeholder="Please submit free tier limits value"
                      onChange={handleLimitChange}
                      fullWidth
                      required
                      size="small"
                      error={limitError}
                      helperText={
                        limitError ? "Please submit free tier limits value" : ""
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ProductionQuantityLimitsIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        min: 0,
                      }}
                      sx={{ minWidth: "100px", width: "20%" }}
                    />
                  </Stack>
                  <Stack alignItems="flex-end">
                    <LoadingButton
                      type="submit"
                      loading={loading}
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="contained"
                      onClick={handelSave}
                      sx={{ width: "fit-content" }}
                    >
                      Save
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
