import { Container} from '@material-ui/core';
import React, {useState} from 'react';

import Navbar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Auth } from './components/Auth/Auth';
import { Cart } from './components/Cart/Cart';
import { Order } from './components/Order/Order';

const App = () => {
    const [userType, setUserType] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [order, setOrder] = useState([]);
    console.log(order);
    return (
        <BrowserRouter>
            <Container maxwidth="lg">
                <Navbar setUserType={setUserType} setShowEdit={setShowEdit} order={order} />
                <Routes>
                    <Route path="/" exact element={<Home showEdit={showEdit} setShowEdit={setShowEdit} setOrder={setOrder} />} />
                    <Route path="/auth" exact element={<Auth userType={userType} />} />
                    <Route path="/cart" exact element={<Cart order={order} />} />
                    <Route path="/order" exact element={<Order />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;