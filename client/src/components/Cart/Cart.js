import { Button, Paper, Container,  Tooltip } from '@material-ui/core';
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
import {createOrder} from '../../actions/order';

export const Cart = ({ order }) => {
    const books = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [orders, setOrders] = useState(JSON.parse(localStorage.getItem(`${user?.result?._id}`)));
    const location = useLocation();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
        setOrders(JSON.parse(localStorage.getItem(`${user?.result?._id}`)));
    }, [location]);


    const sendOrder = () => {
        orders.forEach(order => {
            dispatch(createOrder({ userId: order.userId, bookId: order.bookId, title: order.title, quantity: order.quantity }));
        }) 
    }


    console.log(orders);
    console.log(books[1]?._id);
    //const rows = books?.filter((book) => orders.includes(book?._id));


    return (
        <Container  component="main" maxWidth="sm">
            <Paper style={{ borderRadius: '50px'}}  className={classes.paper} elevation={3} >
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 400, minHeight: 300 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Book Title</TableCell>
                            <TableCell align="right">Author</TableCell>
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
            <Button size="small" style={{ color: '#701a75'}}  onClick={sendOrder}>
                <LocalShippingIcon fontSize="small" />
                Send Order
            </Button>
            </Paper>
        </Container>
    )
}