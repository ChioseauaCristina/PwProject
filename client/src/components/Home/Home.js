import React, { useEffect, useState } from "react";
import Books from "../Books/Books";
import Form from "../Form/Form";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getBooks } from "../../actions/books";

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch, currentId]);

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-around" spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <Books setCurrentId={setCurrentId} />
                    </Grid>
                    {/* <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid> */}
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;