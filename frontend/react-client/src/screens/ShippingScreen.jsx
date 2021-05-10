import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen({ history }) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress: prevAddress } = cart;

    const [shippingAddress, setShippingAddress] = useState({
        street: prevAddress.address,
        city: prevAddress.city,
        postalCode: prevAddress.postalCode,
        country: prevAddress.country,
    });

    const handleShippingAddressChange = (event) => {
        const { name, value } = event.target;
        setShippingAddress((prevValue) => ({ ...prevValue, [name]: value }));
    };

    const userLogin = useSelector((state) => state.userLogin);
    const { homeAddress, workAddress } = userLogin.userInfo;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(shippingAddress));
        history.push("/placeorder");
    };

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Row>
                {homeAddress && (
                    <Col className="pr-1">
                        <Card
                            style={{ cursor: "pointer" }}
                            className="mb-2"
                            onClick={(e) => setShippingAddress(homeAddress)}
                        >
                            <Card.Header>Home Address</Card.Header>
                            <Card.Body name="home">
                                <Card.Title>{homeAddress.street}</Card.Title>
                                <Card.Text>
                                    {homeAddress.city}, {homeAddress.country}
                                </Card.Text>
                                <Card.Text>Postal Code: {homeAddress.postalCode}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
                {workAddress && (
                    <Col className="pl-1">
                        <Card
                            style={{ cursor: "pointer" }}
                            className="mb-2"
                            onClick={(e) => setShippingAddress(workAddress)}
                        >
                            <Card.Header>Work Address</Card.Header>
                            <Card.Body>
                                <Card.Title>{workAddress.street}</Card.Title>
                                <Card.Text>
                                    {workAddress.city}, {workAddress.country}
                                </Card.Text>
                                <Card.Text>Postal Code: {workAddress.postalCode}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter street"
                        value={shippingAddress.street}
                        required
                        name="street"
                        onChange={handleShippingAddressChange}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={shippingAddress.city}
                        required
                        name="city"
                        onChange={handleShippingAddressChange}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={shippingAddress.country}
                        required
                        onChange={handleShippingAddressChange}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter postal code"
                        value={shippingAddress.postalCode}
                        required
                        onChange={handleShippingAddressChange}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;
