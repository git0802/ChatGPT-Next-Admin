"use client"

import Image from "next/image";

import { Alert, Box, Dialog, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserTable() {

    const [packageData, setPackageData] = useState<any[]>([]);
    const [modalStatus, setModalStatus] = useState(false);

    const USER_STATUS_OPTIONS = [
        { value: 'unverified', label: 'Unverified' },
        { value: 'verified', label: 'Verified' },
        { value: 'transferable', label: 'Transferable' },
        { value: 'failed', label: 'Failed' },
        { value: 'expired', label: 'Expired' },
      ];

    const getUserList =  async () => {
        try {
            const { data } = await axios.get("/api/user");            

            setPackageData(data);
            console.log("User List: ", data);
            return data;
        } catch (error) {
            console.error("Error: ", error);            
        }
    }

    const deleteUser = async (id: any) => {
        try {
            const response: any = await axios.delete("/api/user", { data: {id}});

            console.log("Success: ", response);

            getUserList();
            return response;            
        } catch (error) {
            console.error("Error: ", error);            
        }
    }

    const handleModal = (status: boolean) => {
        setModalStatus(status);
    }

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
             onClose={() => handleModal(false)}
             PaperProps={{
                sx: { maxWidth: 720 },
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
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <Select name="status" label="Status">
                        {USER_STATUS_OPTIONS.map((status) => (
                            <MenuItem key={status.value} value={status.value}>
                            {status.label}
                            </MenuItem>
                        ))}
                        </Select>
                    </Box>
                </DialogContent>
            </Dialog>
            
            <TableContainer component={Paper} className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className="text-left bg-gray-2 dark:bg-meta-4">
                            <TableCell className="text-black dark:text-white">
                                <Typography className="pl-9" variant="subtitle1" >
                                    User
                                </Typography>
                            </TableCell>
                            <TableCell className="text-black dark:text-white" align="left">
                                <Typography variant="subtitle1" >
                                    Amount
                                </Typography>
                            </TableCell>
                            <TableCell className="text-black dark:text-white" align="left">
                                <Typography variant="subtitle1" >
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell className="text-black dark:text-white" align="left">
                                <Typography variant="subtitle1" >
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packageData.map((packageItem: any, key: any) => (
                           <TableRow
                           key={key}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                       >
                           <TableCell component="th" scope="row">
                                <div className="flex flex-row items-center space-x-4 pl-9">
                                    <div className="flex-shrink-0">
                                        <Image className='rounded-full' src={packageItem.imageUrl} alt="Brand" width={48} height={48} />
                                    </div>
                                    <div>
                                        <div className='flex flex-row items-center space-x-2'>
                                            {
                                                packageItem.firstName && 
                                                    <Typography variant="subtitle1" className="font-medium text-black dark:text-white">
                                                        {packageItem.firstName}
                                                    </Typography>
                                            }
                                            {
                                                packageItem.lastName && 
                                                <Typography variant="subtitle1" className="font-medium text-black dark:text-white">
                                                    {packageItem.lastName}
                                                </Typography>
                                            }
                                        </div>
                                        <Typography className="text-black dark:text-white" variant="caption" >
                                            {packageItem.emailAddresses[0].emailAddress}
                                        </Typography>
                                    </div>                              
                                </div>
                           </TableCell>
                           <TableCell align="left">
                               <Typography className="text-black dark:text-white" variant="caption" >
                                   {packageItem.content}
                               </Typography>
                           </TableCell>
                           <TableCell align="left">
                                <p
                                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem.emailAddresses[0].verification?.status === "verified"
                                        ? "text-success bg-success"
                                        : packageItem.status === "unverified"
                                            ? "text-danger bg-danger"
                                            : "text-warning bg-warning"
                                        }`}
                                >
                                    {packageItem.emailAddresses[0].verification?.status}
                                </p>                                   
                           </TableCell>
                           <TableCell align="right">
                               <Stack direction="row" spacing={1}>
                                    <IconButton color="primary" onClick={() => handleModal(true)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="warning" onClick={() => deleteUser(packageItem.id)}>
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
    )
}