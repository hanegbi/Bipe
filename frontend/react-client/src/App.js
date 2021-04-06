import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import CartScreen from './screens/CartScreen';
import { Container } from 'react-bootstrap';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ShippingScreen from './screens/ShippingScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen.jsx';
import UserEditScreen from './screens/UserEditScreen.jsx';
import ProductListScreen from './screens/ProductListScreen';

function App() {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route path='/order/:id' component={OrderScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/placeorder' component={PlaceOrderScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/admin/userlist' component={UserListScreen} />
                    <Route
                        path='/admin/productlist'
                        component={ProductListScreen}
                    />
                    <Route
                        path='/admin/users/:id/edit'
                        component={UserEditScreen}
                    />
                    <Route
                        path='/search/:category?/:keyword?'
                        component={HomeScreen}
                    />
                    <Route path='/' component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
