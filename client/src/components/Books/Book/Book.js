import React from "react";
import useStyles from './styles';
import { useDispatch } from "react-redux";
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { deleteBook } from "../../../actions/books";

import books from "../../../reducers/books";

const Book = ({ book, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={book.selectedFile} title={book.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{book.creator}</Typography>
                <Typography variant="body2">{moment(book.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(book._id)}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{book.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography variant="h5" className={classes.title} gutterBottom>{book.title}</Typography>
            <CardContent>
                <Typography variant="h5" gutterBottom>{book.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {}}>
                    <ThumbUpAltIcon fontSize="small" />
                    Like
                    {book.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deleteBook(book._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Book;