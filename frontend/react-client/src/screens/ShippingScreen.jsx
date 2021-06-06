import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import { listHouseholdDetails } from "../actions/householdActions";

function ShippingScreen({ history }) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress: prevAddress } = cart;

    const dispatch = useDispatch();

    const householdDetails = useSelector((state) => state.householdDetails);
    const { loading, error, household } = householdDetails;

    useEffect(() => {
        const cityId = localStorage.getItem("cityId");
        dispatch(listHouseholdDetails(cityId));
    }, [dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        history.push("/placeorder");
    };

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Row>
                <Col className="pr-1">
                    <Card style={{ cursor: "pointer" }} className="mb-2">
                        <Card.Header>Home Address</Card.Header>
                        <Card.Body name="home">
                            <Card.Title>{household.street}</Card.Title>
                            <Card.Text>
                                {household.city}, {household.country}
                            </Card.Text>
                            <Card.Text>Postal Code: {household.postalCode}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Form onSubmit={submitHandler}>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;
