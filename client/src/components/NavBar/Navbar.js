import React, {useState, useEffect} from "react";
import useStyles from './styles';
import { AppBar, Avatar, Toolbar, Typography, Button, Container, Box } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useDispatch } from "react-redux";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Navbar = ({ setUserType, setShowEdit, order }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);
    };

    const seeOrders = () => {
        //dispatch({ type: 'LOGOUT' });
        navigate('/order');
    };

    const addBook = () => {
        setShowEdit(true);
    }
    console.log(user);

    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const toCart = () => {
        localStorage.setItem(`${user?.result?._id}`, JSON.stringify(order));
        navigate('/cart');
    }

    return (
        <AppBar className={classes.appBar} style={{ backgroundColor : 'hsla(336, 61%, 81%, 0.3)' }} color="default" position="static"  >
            <Container  maxWidth="xl" color="inheirt">
                <Toolbar className={classes.container} disableGutters>
                    <Link className={classes.logo}  to="/" style={{ textDecoration: 'none' }}>
                        <LocalLibraryIcon fontSize="large" style={{color: '#707070'}} sx = {{ display: { xs: 'none', md: 'flex' }, mr: 2}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            className={classes.heading} 
                            sx={{ display: {mt: 40 }}}   
                            style={{color: '#707070'}}
                        >
                            BOOK SHOP
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 0 }}>
                    {user?.result ? (
                        <div className={classes.profile}>
                            <Avatar style={{ backgroundColor: '#ffdede', color: '#707070'}} alt={user?.result.name} >{user?.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                            {user.result?.userType === "admin" && <Button variant="contained" style={{ backgroundColor: '#ffdede', color: '#707070'}} onClick={addBook}>Add book</Button>}
                            {user.result?.userType === "user" && 
                                <IconButton aria-label="cart" onClick={toCart}>
                                    <Badge badgeContent={order?.length} color="secondary">
                                        <ShoppingCartIcon style={{color: '#707070'}} />
                                    </Badge>
                                </IconButton>
                            }
                            <IconButton onClick={seeOrders}>
                                <StorefrontIcon style={{color: '#707070'}} />
                            </IconButton>
                            <Button variant="contained" style={{ backgroundColor: '#ffdede', color: '#707070'}} onClick={logout}>Logout</Button>
                        </div>
                        ) : (
                        <div className={classes.signin}>
                            <Button style={{ backgroundColor: '#ffdede'}} onClick={() => {setUserType('user'); }} component={Link} to="/auth" variant="contained">
                                user
                            </Button>
                            <Button style={{ backgroundColor: '#ffdede'}} onClick={() => {setUserType('admin');}} component={Link} to="/auth" variant="contained">
                                ADMIN
                            </Button>
                        </div>
                        )
                    }
                    </Box>
                </Toolbar>
            </Container>  
        </AppBar>
        
    );
}

export default Navbar;

