import Image from "next/image";

import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserPromptTable(props: any) {
    const { packageData } = props;

    if (!packageData) return;    

    return (
        <>
             <TableContainer component={Paper} className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className="text-left bg-gray-2 dark:bg-meta-4">
                            <TableCell className="text-black dark:text-white">
                                <Typography variant="subtitle1" >
                                    Title
                                </Typography>
                            </TableCell>
                            <TableCell className="text-black dark:text-white" align="left">
                                <Typography variant="subtitle1" >
                                    Content
                                </Typography>
                            </TableCell>
                            <TableCell className="text-black dark:text-white" align="left">
                                <Typography variant="subtitle1" >
                                    Author
                                </Typography>
                            </TableCell>
                            <TableCell className="text-black dark:text-white" align="center">
                                <Typography variant="subtitle1" >
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packageData.map((row: any, key: any) => (
                            row.isUser && (
                                <TableRow
                                    key={key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Typography className="text-black dark:text-white" variant="subtitle1" >
                                            {row.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography className="text-black dark:text-white" variant="caption" >
                                            {row.content}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography className="text-black dark:text-white" variant="subtitle1" >
                                            {row.userEmail}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1}>
                                            <IconButton color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="warning" >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            )
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}