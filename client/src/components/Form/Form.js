import React from "react";
import { useState, useEffect } from "react";
import useStyles from './styles';
import FileBase from 'react-file-base64'
import {TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createBook, updateBook } from "../../actions/books";

const Form = ({ currentId, setCurrentId }) => {
    const book = useSelector((state) => currentId ? state.books.find((b) => b._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [bookData, setBookData] = useState({
        creator: '',
        title:'',
        message: '', 
        tags: '',
        selectedFile: ''
    });

    useEffect(() => {
        if(book) setBookData(book);
    }, [book])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateBook(currentId, bookData));
        } else {
            dispatch(createBook(bookData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setBookData({
            creator: '',
            title:'',
            message: '', 
            tags: '',
            selectedFile: ''
        })
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate classsName={`${classes.root} ${classes.form}`}  onSubmit={handleSubmit}>
                <Typography variant="h6">
                    { currentId ? 'Edit a book' : 'Create a book'}
                </Typography>
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth
                    value={bookData.creator}
                    onChange={(e) => setBookData({ ...bookData, creator: e.target.value })}
                />
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth
                    value={bookData.title}
                    onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" 
                    fullWidth
                    value={bookData.message}
                    onChange={(e) => setBookData({ ...bookData, message: e.target.value })}
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags" 
                    fullWidth
                    value={bookData.tags}
                    onChange={(e) => setBookData({ ...bookData, tags: e.target.value })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setBookData({...bookData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;