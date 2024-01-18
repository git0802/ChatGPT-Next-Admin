import Image from "next/image";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

import axios from "axios";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import PromptDialog from "../Dialog/PromptDialog";
import ConfirmDialog from "../Dialog/ConfirmDialog";

export default function AdminPromptTable() {
  const [packageData, setPackageData] = useState([]);

  const [modalStatus, setModalStatus] = useState(false);
  const [updateModalStatus, setUpdateModalStatus] = useState(false);

  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  const [newtitle, setNewTitle] = useState("");
  const [newcontent, setNewContent] = useState("");

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const [promptId, setPromptId] = useState("");
  const [deletePromptId, setDeletePromptId] = useState("");

  if (!packageData) return;

  const getPrompt = async () => {
    try {
      const { data } = await axios.get("/api/prompt");
      setPackageData(data);
    } catch (error) {
      console.error("Errors: ", error);
    }
  };

  const createPrompt = async () => {
    const id = nanoid();
    const isUser = false;

    setTitleError(newtitle ? false : true);
    setContentError(newcontent ? false : true);

    if (!newtitle || !newcontent) return;

    const newPrompt = {
      id: id,
      title: newtitle,
      content: newcontent,
      isUser: isUser,
    };

    try {
      const response = await axios.post("/api/prompt", newPrompt);

      getPrompt();
      setNewTitle("");
      setNewContent("");
    } catch (error) {
      console.error("Errors: ", error);
    }
    closeModal();
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

  const closeModal = () => {
    setModalStatus(false);
  };

  const openModal = () => {
    setTitleError(false);
    setContentError(false);

    setModalStatus(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalStatus(false);
  };

  const openUpdateModal = (props: any) => {
    const { id, title, content } = props;

    setTitleError(false);
    setContentError(false);

    setPromptId(id);
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

  const handleNewTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleNewContentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewContent(event.target.value);
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

  useEffect(() => {
    getPrompt();
  }, []);

  return (
    <>
      <PromptDialog
        dialogTitle="Create a new Prompt"
        buttonText="Create"
        title={newtitle}
        content={newcontent}
        status={modalStatus}
        closeModal={closeModal}
        handelTitleChange={handleNewTitleChange}
        handelContentChange={handleNewContentChange}
        handelPrompt={createPrompt}
        titleError={titleError}
        contentError={contentError}
      />

      <PromptDialog
        dialogTitle="Update Prompt"
        buttonText="Update"
        title={updateTitle}
        content={updateContent}
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

      <div className="flex items-end justify-end ">
        <Button
          variant="contained"
          color="success"
          startIcon={<CreateIcon />}
          onClick={openModal}
        >
          Create
        </Button>
      </div>

      <TableContainer
        component={Paper}
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="text-left bg-gray-2 dark:bg-meta-4">
              <TableCell className="text-black dark:text-white">
                <Typography variant="subtitle1" noWrap>
                  Title
                </Typography>
              </TableCell>
              <TableCell className="text-black dark:text-white" align="left">
                <Typography variant="subtitle1" noWrap>
                  Content
                </Typography>
              </TableCell>
              <TableCell className="text-black dark:text-white" align="left">
                <Typography variant="subtitle1">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packageData.map(
              (row: any, key: any) =>
                !row.isUser && (
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
