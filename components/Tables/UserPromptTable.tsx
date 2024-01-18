import Image from "next/image";

import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import { useEffect, useState } from "react";
import PromptDialog from "../Dialog/PromptDialog";
import ConfirmDialog from "../Dialog/ConfirmDialog";

export default function UserPromptTable() {
  const [packageData, setPackageData] = useState([]);

  const [promptId, setPromptId] = useState("");
  const [deletePromptId, setDeletePromptId] = useState("");
  const [email, setEmail] = useState("");

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  const [updateModalStatus, setUpdateModalStatus] = useState(false);

  const getPrompt = async () => {
    try {
      const { data } = await axios.get("/api/prompt");
      setPackageData(data);
    } catch (error) {
      console.error("Errors: ", error);
    }
  };

  const updatePrompt = async () => {
    setTitleError(updateTitle ? false : true);
    setContentError(updateContent ? false : true);

    if (!updateTitle || !updateContent) return;

    const updatePrompt = {
      id: promptId,
      title: updateTitle,
      content: updateContent,
    };

    try {
      const response = await axios.post("/api/prompt", updatePrompt);

      getPrompt();
      setUpdateTitle("");
      setUpdateContent("");
    } catch (error) {
      console.error("Errors: ", error);
    }

    closeUpdateModal();
  };

  const deletePrompt = async (id: any) => {
    try {
      const response = await axios.delete("/api/prompt", { data: { id } });
      getPrompt();
    } catch (error) {
      console.error("Errors: ", error);
    }
  };

  const closeUpdateModal = () => {
    setUpdateModalStatus(false);
  };

  const openUpdateModal = (props: any) => {
    const { id, title, content, userEmail } = props;

    setTitleError(false);
    setContentError(false);

    setPromptId(id);
    setEmail(userEmail);
    setUpdateTitle(title);
    setUpdateContent(content);

    setUpdateModalStatus(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalStatus(false);
  };

  const openDeleteModal = (id: any) => {
    setDeletePromptId(id);
    setDeleteModalStatus(true);
  };

  const handleUpdateTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateTitle(event.target.value);
  };

  const handleUpdateContentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateContent(event.target.value);
  };

  if (!packageData) return;

  useEffect(() => {
    getPrompt();
  }, []);

  return (
    <>
      <PromptDialog
        dialogTitle="Update Prompt"
        buttonText="Update"
        title={updateTitle}
        content={updateContent}
        email={email}
        status={updateModalStatus}
        closeModal={closeUpdateModal}
        handelTitleChange={handleUpdateTitleChange}
        handelContentChange={handleUpdateContentChange}
        handelPrompt={updatePrompt}
        titleError={titleError}
        contentError={contentError}
      />

      <ConfirmDialog
        open={deleteModalStatus}
        onClose={closeDeleteModal}
        title="Delete"
        content={<>Are you sure want to delete items?</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deletePrompt(deletePromptId);
              closeDeleteModal();
            }}
          >
            Delete
          </Button>
        }
      />

      <TableContainer
        component={Paper}
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="text-left bg-gray-2 dark:bg-meta-4">
              <TableCell className="text-black dark:text-white">
                <Typography variant="subtitle1">Title</Typography>
              </TableCell>
              <TableCell className="text-black dark:text-white" align="left">
                <Typography variant="subtitle1">Content</Typography>
              </TableCell>
              <TableCell className="text-black dark:text-white" align="left">
                <Typography variant="subtitle1">Author</Typography>
              </TableCell>
              <TableCell className="text-black dark:text-white" align="center">
                <Typography variant="subtitle1">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packageData.map(
              (row: any, key: any) =>
                row.isUser && (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography
                        className="text-black dark:text-white"
                        variant="subtitle1"
                      >
                        {row.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        className="text-black dark:text-white"
                        variant="caption"
                      >
                        {row.content}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        className="text-black dark:text-white"
                        variant="subtitle1"
                      >
                        {row.userEmail}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            openUpdateModal(row);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="warning"
                          onClick={() => openDeleteModal(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
