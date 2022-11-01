import { authActionTypesEnum } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
    console.log(state.authData);
    switch(action.type) {
        case authActionTypesEnum.auth:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return { ...state, authData: action?.data };
        case authActionTypesEnum.logout:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
}   

export default authReducer;