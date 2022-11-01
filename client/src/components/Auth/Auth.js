import React, {useState, useEffect} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles';
import {Input} from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';
import { gapi } from "gapi-script";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signin, signup } from '../../actions/auth';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: ''
}

export const Auth = ({ userType }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    
    useEffect(() => {
        setFormData({...formData, userType: userType})
    }, [userType])
    
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        console.log(formData);
        console.log(userType);
        e.preventDefault();
        setFormData({...formData, userType: userType})
        if(isSignUp) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp) 
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        console.log(res?.profileObj);
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: {result, token, userType}});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google sign in was unsuccessful. Try again later");
    };

    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: "908506278090-srcu9llesf6ogoqr0h5i3cmp1vl5djhm.apps.googleusercontent.com",
            scope: 'email',
          });
        }
    
        gapi.load('client:auth2', start);
      }, []);

    return (
        <Container component="main" maxWidth="xs" >
            <Paper className={classes.paper} elevation={3} >
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isSignUp ? 'Sign Up' : 'Sign in'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign up' : 'Sign in'}
                    </Button>
                    <GoogleLogin
                        clientId="908506278090-srcu9llesf6ogoqr0h5i3cmp1vl5djhm.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color="primary" 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.enabled} 
                                startIcon={<Icon />} 
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
