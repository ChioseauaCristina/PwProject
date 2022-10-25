import * as api from '../api';
import { actionTypesEnum } from './../constants/actionTypes'

//Action creators
export const getBooks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBooks();
        dispatch({type: actionTypesEnum.fetchAll, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createBook = (book) => async (dispatch) => {
    try {
        const {data} = await api.createBook(book);
        dispatch({type: actionTypesEnum.create, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateBook = (id, book) => async (dispatch) => {
    try {
        const {data} = await api.updateBook(id, book);
        dispatch({type: actionTypesEnum.update, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteBook = (id) => async (dispatch) => {
    try {
        await api.deleteBook(id);
        dispatch({type: actionTypesEnum.delete, payload: id})
    } catch (error) {
        console.log(error);
    }
}
//action creators = functions that returns an action
//action = object with type and payload
//readux thunk
// const response = await api.fetchBooks(); => we get the response from the api and we destructure it because the response always comes with data
// data i snow books