import React from "react";
import useStyles from './styles';
import { AppBar, Avatar, Toolbar, Typography, Button, Container, Box } from "@material-ui/core";
import book from '../../images/book.jpeg';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const classes = useStyles();
    const user = null;

    return (
        <AppBar className={classes.appBar} position="static" >
            <Container  maxWidth="xl">
                <Toolbar className={classes.container} disableGutters>
                    <div className={classes.logo}>
                        <LocalLibraryIcon fontSize="large" sx = {{ display: { xs: 'none', md: 'flex' }, mr: 2}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            href="/" 
                            className={classes.heading} 
                            sx={{ display: {mt: 40 }}}   
                        >
                            BOOK SHOP
                        </Typography>
                    </div>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button className={classes.button} component={Link} to="/auth" variant="contained">
                            SIGN IN
                        </Button>
                    </Box>
                </Toolbar>
            </Container>  
        </AppBar>
        
    );
}

export default Navbar;

