import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

const GroupOrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const householdsOrders = useSelector((state) => state.storeLocationList);
    const { loading, error, storeLocations } = householdsOrders;

    // const orderList = useSelector((state) => state.orderList);
    // const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, userInfo]);

    return (
        <>
            <h1>Group Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">error</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeLocations.map((group) =>
                            group.orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{group._id}</td>
                                    <td>
                                        {group.street}, {group.city}, {group.country}
                                    </td>
                                    <td>{order.date}</td>
                                    <td>
                                        {order.list
                                            .map((o) => o.totalPrice)
                                            .reduce((acc, cur) => acc + cur, 0)}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant="light" className="btn-sm">
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default GroupOrderListScreen;
