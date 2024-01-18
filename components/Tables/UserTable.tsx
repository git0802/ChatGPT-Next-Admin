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
import { LoadingButton } from "@mui/lab";

import Stack from "@mui/material/Stack";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserTable() {
  const [packageData, setPackageData] = useState<any[]>([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState<Number>();

  const getUserList = async () => {
    try {
      const { data } = await axios.get("/api/user");

      const { response, userData } = data;

      interface ResultItemType {
        userId: string; // or number, depending on your ID type
        email: string;
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
            const status = response[j].emailAddresses[0].verification?.status;
            const imageUrl = response[j].imageUrl;

            resultData.push({
              userId,
              email,
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
      return resultData;
    } catch (error) {
      console.error("Error: ", error);
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
        amount,
      };
      console.log("HHHH", data);

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
    console.log("User: ", props);

    const userId = props.userId;
    const firstName = props.firstName;
    const lastName = props.lastName;
    const amount = props.amount;

    setUserId(userId);
    setFirstName(firstName);
    setLastName(lastName);
    setAmount(amount);

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

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={false}
        open={modalStatus}
        onClose={closeModal}
        PaperProps={{
          sx: { maxWidth: 500 },
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
            />
            <TextField
              value={lastName}
              name="lastName"
              label="Last Name"
              onChange={handleLastNameChange}
            />
            <TextField
              value={amount}
              name="amount"
              label="Amount"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleAmountNameChange}
            />
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
              <TableCell className="text-black dark:text-white">
                <Typography className="pl-9" variant="subtitle1">
                  User
                </Typography>
              </TableCell>
              <TableCell className="text-black dark:text-white" align="left">
                <Typography variant="subtitle1">Amount</Typography>
              </TableCell>
              <TableCell className="text-black dark:text-white" align="left">
                <Typography variant="subtitle1">Status</Typography>
              </TableCell>
              <TableCell className="text-black dark:text-white" align="left">
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
                  <div className="flex flex-row items-center space-x-4 pl-9">
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
                        variant="caption"
                      >
                        {packageItem.email}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    className="text-black dark:text-white"
                    variant="subtitle1"
                  >
                    {packageItem.amount === 0
                      ? "Free tier Limited"
                      : packageItem.amount}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      packageItem.status === "verified"
                        ? "text-success bg-success"
                        : packageItem.status === "unverified"
                        ? "text-danger bg-danger"
                        : "text-warning bg-warning"
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1}>
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
