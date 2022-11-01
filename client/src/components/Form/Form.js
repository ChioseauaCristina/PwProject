import React from "react";
import { useState, useEffect } from "react";
import useStyles from './styles';
import FileBase from 'react-file-base64'
import {TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createBook, updateBook } from "../../actions/books";

const Form = ({ currentId, setCurrentId, setShowEdit }) => {
    const book = useSelector((state) => currentId ? state.books.find((b) => b._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [bookData, setBookData] = useState({
        title:'',
        message: '', 
        tags: '',
        selectedFile: ''
    });
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(book) setBookData(book);
    }, [book])

    const handleSubmit = (e) => {
        e.preventDefault();

        setShowEdit(false);

        if(currentId) {
            dispatch(updateBook(currentId, { ...bookData, name: user?.result?.name}));
        } else {
            dispatch(createBook({ ...bookData, name: user?.result?.name}));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(0);
        setBookData({
            title:'',
            message: '', 
            tags: '',
            selectedFile: '',
            author: ''
        })
    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign in to create your own book.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId ? `Editing "${book.title}"` : 'Post a book for sale'}</Typography>
          <TextField name="title" variant="outlined" label="Title" fullWidth value={bookData.title} onChange={(e) => setBookData({ ...bookData, title: e.target.value })} />
          <TextField name="author" variant="outlined" label="Author" fullWidth value={bookData.author} onChange={(e) => setBookData({ ...bookData, author: e.target.value })} />
          <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={bookData.message} onChange={(e) => setBookData({ ...bookData, message: e.target.value })} />
          <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={bookData.tags} onChange={(e) => setBookData({ ...bookData, tags: e.target.value.split(',') })} />
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setBookData({ ...bookData, selectedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} style={{ backgroundColor: '#ffdede'}} variant="contained" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" style={{color: '#707070'}} size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
    );
}

export default Form;