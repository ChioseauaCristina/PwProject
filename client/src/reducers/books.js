import { actionTypesEnum } from "../constants/actionTypes";

export default (books = [], action) => {
    switch(action.type) {
        case actionTypesEnum.fetchAll:
            return action.payload;
        case actionTypesEnum.create:
            return [...books, action.payload]
        case actionTypesEnum.update:
            return books.map((book) => book._id === action.payload._id ? action.payload : book);
        case actionTypesEnum.delete:
            return books.filter((book) => book._id !== action.payload);
        default:
            return books;
    }
}