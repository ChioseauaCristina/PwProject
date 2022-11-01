import * as api from '../api';
import { authActionTypesEnum } from './../constants/actionTypes';

export const signin = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: authActionTypesEnum.auth, data})
        navigate('/');
    } catch(error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: authActionTypesEnum.auth, data})
        navigate('/'); 
    } catch(error) {
        console.log(error);
    }
}