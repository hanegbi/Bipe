import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CartScreen from "./screens/CartScreen";
import { Container } from "react-bootstrap";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ShippingScreen from "./screens/ShippingScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen.jsx";
import UserEditScreen from "./screens/UserEditScreen.jsx";
import StoreAddressScreen from "./screens/StoreAddressScreen.jsx";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";
import OrderListScreen from "./screens/OrderListScreen";
import GroupOrderListScreen from "./screens/GroupOrderListScreen";
import EmailVerficiationScreen from "./screens/EmailVerficiationScreen";
import UserVerifiedScreen from "./screens/UserVerifiedScreen";

function App() {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/households" component={StoreAddressScreen} />
                    <Route path="/order/:id" component={OrderScreen} />
                    <Route path="/shipping" component={ShippingScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/admin/userlist" component={UserListScreen} />
                    <Route path="/admin/productlist" component={ProductListScreen} exact />
                    <Route
                        path="/admin/productlist/:pageNumber"
                        component={ProductListScreen}
                        exact
                    />
                    <Route path="/admin/users/:id/edit" component={UserEditScreen} />
                    <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
                    <Route path="/admin/product/create" component={ProductCreateScreen} />
                    <Route path="/admin/orderlist/:id" component={OrderListScreen} />
                    <Route path="/admin/grouporderlist" component={GroupOrderListScreen} />
                    <Route path="/search/:category?/:keyword?" component={HomeScreen} exact />
                    <Route
                        path="/search/:category?/:keyword?/page/:pageNumber"
                        component={HomeScreen}
                    />
                    <Route path="/verification" component={EmailVerficiationScreen} />
                    <Route path="/verified/:userId?/:isVerified?" component={UserVerifiedScreen} />
                    <Route
                        path="/admin/graphs"
                        render={() => (window.location = "http://localhost:4200")}
                    />
                    <Route path="/page/:pageNumber" component={HomeScreen} exact />
                    <Route path="/home" component={HomeScreen} exact />
                    <Route path="/" component={StoreAddressScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
