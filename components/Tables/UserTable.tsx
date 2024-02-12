"use client";

import Image from "next/image";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Stack from "@mui/material/Stack";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";
import BackdropPage from "../Backdrop/Backdrop";

export default function UserTable() {
  const [packageData, setPackageData] = useState<any[]>([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState<Number>();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [statusOne, setStatusOne] = useState("");

  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };

  const handleBackdropOpen = () => {
    setBackdropOpen(true);
  };

  const getUserList = async () => {
    handleBackdropOpen();
    try {
      const { data } = await axios.get("/api/user");

      const { response, userData } = data;

      interface ResultItemType {
        userId: string; // or number, depending on your ID type
        email: string;
        phone: string;
        imageUrl: string;
        firstName: string;
        lastName: string;
        amount: number; // assuming amount is a number type
        status?: string; // '?' makes this field optional
      }

      let resultData: ResultItemType[] = [];

      for (let i = 0; i < userData.length; i++) {
        for (let j = 0; j < response.length; j++) {
          if (userData[i].userId === response[j].id) {
            const userId = response[j].id;
            const firstName = response[j].firstName;
            const lastName = response[j].lastName;
            const amount = userData[i].amount;
            const email = response[j].emailAddresses[0].emailAddress;
            const phone = response[j].phoneNumbers[0]?.phoneNumber;
            const status = userData[i].status;
            const imageUrl = response[j].imageUrl;

            resultData.push({
              userId,
              email,
              phone,
              imageUrl,
              firstName,
              lastName,
              amount,
              status,
            });
          }
        }
      }

      setPackageData(resultData);

      handleBackdropClose();
      return resultData;
    } catch (error) {
      console.error("Error: ", error);

      handleBackdropClose();
    }
  };

  const deleteUser = async (id: any) => {
    try {
      const response: any = await axios.delete("/api/user", { data: { id } });

      console.log("Success: ", response);

      getUserList();
      return response;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const updateUser = async () => {
    setIsLoading(true);

    try {
      const data = {
        userId,
        firstName,
        lastName,
        statusOne,
        amount,
      };

      const response: any = await axios.post("/api/user", data);
      console.log("Response: ", response);

      getUserList();
    } catch (error) {
      console.error("Errors: ", error);
    }

    setIsLoading(false);
    closeModal();
  };

  const handleModal = (props: any) => {
    const userId = props.userId;
    const firstName = props.firstName;
    const lastName = props.lastName;
    const amount = props.amount;
    const status = props.status;

    setUserId(userId);
    setFirstName(firstName);
    setLastName(lastName);
    setStatusOne(status);

    if (status === "free") {
      setAmount(amount);
    }

    openModal();
  };

  const openModal = () => {
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleAmountNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valueAsNumber = Number(event.target.value);

    if (!isNaN(valueAsNumber)) {
      setAmount(valueAsNumber);
    } else {
      setAmount(undefined);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  if (!packageData) return;

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusOne(event.target.value);
  };

  return (
    <>
      <BackdropPage open={backdropOpen} handleClose={handleBackdropClose} />

      <Dialog
        fullWidth
        maxWidth={false}
        open={modalStatus}
        onClose={closeModal}
        PaperProps={{
          sx: { maxWidth: 380 },
        }}
      >
        <DialogTitle>User Update</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <TextField
              value={firstName}
              name="firstName"
              label="First Name"
              onChange={handleFirstNameChange}
              size="small"
            />
            <TextField
              value={lastName}
              name="lastName"
              label="Last Name"
              onChange={handleLastNameChange}
              size="small"
            />
            <FormControl size="small">
              <InputLabel sx={{ width: "100px" }}>Status</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={statusOne}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="premium">PREMIUM</MenuItem>
                <MenuItem value="free">FREE</MenuItem>
              </Select>
            </FormControl>
            {statusOne === "free" && (
              <TextField
                value={amount}
                name="amount"
                label="Amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleAmountNameChange}
                size="small"
              />
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={closeModal}>
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            onClick={updateUser}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <TableContainer
        component={Paper}
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="text-left bg-gray-2 dark:bg-meta-4">
              <TableCell className="text-black dark:text-white" align="center">
                <Typography className="pl-9" variant="subtitle1">
                  User
                </Typography>
              </TableCell>
              <TableCell className="text-black dark:text-white" align="center">
                <Typography variant="subtitle1">Phone Number</Typography>
              </TableCell>
              <TableCell className="text-black dark:text-white" align="center">
                <Typography variant="subtitle1">Amount</Typography>
              </TableCell>
              <TableCell className="text-black dark:text-white" align="center">
                <Typography variant="subtitle1">Status</Typography>
              </TableCell>
              <TableCell className="text-black dark:text-white" align="center">
                <Typography variant="subtitle1">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packageData.map((packageItem: any, key: any) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div className="flex flex-row items-center space-x-4 pl-9 justify-center">
                    <div className="flex-shrink-0">
                      <Image
                        className="rounded-full"
                        src={packageItem.imageUrl}
                        alt="Brand"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <div className="flex flex-row items-center space-x-2">
                        {packageItem.firstName && (
                          <Typography
                            variant="subtitle1"
                            className="font-medium text-black dark:text-white"
                          >
                            {packageItem.firstName}
                          </Typography>
                        )}
                        {packageItem.lastName && (
                          <Typography
                            variant="subtitle1"
                            className="font-medium text-black dark:text-white"
                          >
                            {packageItem.lastName}
                          </Typography>
                        )}
                      </div>
                      <Typography
                        className="text-black dark:text-white"
                        variant="subtitle2"
                      >
                        {packageItem.email}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    className="text-black dark:text-white"
                    variant="subtitle2"
                  >
                    {packageItem.phone}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    className="text-black dark:text-white"
                    variant="subtitle1"
                  >
                    {packageItem.status === "premium"
                      ? "♾️"
                      : packageItem.amount === 0
                      ? "Free tier Limited"
                      : packageItem.amount}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      packageItem.status === "premium"
                        ? "text-primary bg-primary"
                        : packageItem.status === "free"
                        ? "text-warning bg-warning"
                        : "text-success bg-success"
                    }`}
                  >
                    {packageItem.status.toUpperCase()}
                  </p>
                </TableCell>
                <TableCell align="center">
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconButton
                      color="primary"
                      onClick={() => handleModal(packageItem)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={() => deleteUser(packageItem.userId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
