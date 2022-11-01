import { combineReducers } from 'redux';

import books from './books';
import orders from './order';
import authReducer from './auth';

export default combineReducers({ books, orders, authReducer });