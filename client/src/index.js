import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createRoot } from 'react-dom/client';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './App';
import './index.scss';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
    <Provider store={store}>
        <div className='wrapper'>
            <div className='bubbles'>
                <App className='content'/>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
            </div>
                
        </div>
        
    </Provider>,
);
 