import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createHousehold } from "../actions/householdActions";

function HouseholdCreateScreen({ history }) {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const dispatch = useDispatch();

    const householdCreate = useSelector((state) => state.householdCreate);
    const { household } = householdCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else if (household) {
            history.push(`/home`);
        }
    }, [history, household]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createHousehold({
                street,
                city,
                postalCode,
                country,
            })
        );
    };

    return (
        <>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Create Group</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="street">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="postal-code">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter postal code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Create
                    </Button>
                </Form>
            </FormContainer>
        </>
    );
}

export default HouseholdCreateScreen;
