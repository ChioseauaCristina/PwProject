import React, { useEffect, useState } from "react";
import Book from "./Book/Book";
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux';

const Books = ({ setCurrentId, setShowEdit, setOrder, showEdit }) => {
    const books = useSelector((state) => state.books);


    return (
        !books.length ? <CircularProgress /> : (
            <Grid  container alignItems="stretch" spacing={3}>
                {books.map((book) => (
                    <Grid key={book._id} item xs={12} sm={4}>
                        <Book book={book} setCurrentId={setCurrentId} setShowEdit={setShowEdit} setOrder={setOrder} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Books;