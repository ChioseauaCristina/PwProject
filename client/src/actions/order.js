import * as api from '../api';
import { orderActionTypesEnum } from './../constants/actionTypes'

export const getOrders = () => async(dispatch) => {
    try {
        const { data } = await api.getOrders();
        dispatch({ type: orderActionTypesEnum.get, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createOrder = (orderData) => async (dispatch) => {
    try {
        const {data} = await api.createOrder(orderData);
        dispatch({type: orderActionTypesEnum.create, payload: data});
    } catch (error) {
        console.log(error);
    }
}