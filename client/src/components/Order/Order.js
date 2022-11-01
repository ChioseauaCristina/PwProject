import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useLocation } from 'react-router-dom';
import useStyles from './styles';
import { orderActionTypesEnum } from '../../constants/actionTypes';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useDispatch } from "react-redux";
import { getOrders } from '../../actions/order';

export const Order = ({ order }) => {
    const books = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch, location]);


   
    const orders = useSelector((state) => state.orders);
    console.log(orders);


    return (
        <Container  component="main" maxWidth="sm">
            <Paper style={{ borderRadius: '50px'}} className={classes.paper} elevation={3} >
            <TableContainer component={Paper} style={{ borderRadius: '50px'}} >
                <Table sx={{ minWidth: 400, minHeight: 300 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Book Title</TableCell>
                            <TableCell align="right">Book ID</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow
                            key={order.bookId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {order.title}
                            </TableCell>
                            <TableCell align="right">{order.bookId}</TableCell>
                            <TableCell align="right">{order.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </Container>
    )
}