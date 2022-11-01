import React, {useState, useEffect} from "react";
import useStyles from './styles';
import { useDispatch } from "react-redux";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { deleteBook } from "../../../actions/books";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useLocation } from 'react-router-dom';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import books from "../../../reducers/books";

const Book = ({ book, setCurrentId, setShowEdit, setOrder }) => {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [ quantity, setQuantity ] =  useState(0);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const addToCart = () => {
        setOrder((prevState) => [...prevState, {userId: user?.result?._id, bookId: book?._id, title: book?.title, quantity: quantity}]);    
        //dispatch(createOrder({ userId: user?.result?._id, bookId: book?._id }));
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={book.selectedFile} title={book.title} />
            <div className={classes.overlay}>
                <Typography variant="h5">{book.title}</Typography>
                {user?.result?.userType === 'admin' && <Typography variant="body2">Created by {book.name} {moment(book.createdAt).fromNow()}</Typography>}
            </div>
            {user?.result?.userType === 'admin' && <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => {setCurrentId(book._id); setShowEdit(true);}}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>}
            {user?.result?.userType === 'user' && <div className={classes.overlay2}>
            <Button style={{color: 'white'}} size="small" onClick={addToCart} >
                <Tooltip  title={quantity === 0 ? "The selected quantity cannot be zero." : ''}>
                    <AddShoppingCartIcon fontSize="medium"  />
               </Tooltip>
            </Button>
            </div>}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{book?.tags?.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography variant="h6" className={classes.title} gutterBottom>By {book.author}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{book?.message?.split(' ').splice(0, 20).join(' ')}...</Typography>
            </CardContent>
            {user?.result?.userType === 'user' && <CardActions className={classes.buttons}>
                <Button size="small" >
                    <ControlPointIcon onClick={() => setQuantity((prev) => prev + 1)}/>
                </Button>
                {quantity}
                <Button size="small" >
                    <RemoveCircleOutlineIcon onClick={() => setQuantity((prev) => prev >= 1 ? prev - 1 : prev)}/>
                </Button>
            </CardActions>}
            {user?.result?.userType === 'admin' && <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {}}>
                    <ThumbUpAltIcon fontSize="small" />
                    Like
                    {book.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deleteBook(book._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>}
        </Card>
    );
}

export default Book;