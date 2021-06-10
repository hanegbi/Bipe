import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import StoreLocation from "../components/StoreLocation";
import { listHouseholds } from "../actions/householdActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

function StoreAddressScreen({ history }) {
    const dispatch = useDispatch();

    const storeLocationList = useSelector((state) => state.storeLocationList);
    const { loading, error, storeLocations } = storeLocationList;

    useEffect(() => {
        dispatch(listHouseholds());
    }, [dispatch]);

    return (
        <>
            <h1>Choose your store location</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row className="justify-content-md-center">
                        {storeLocations.map((storeLocation) => (
                            <Col
                                onClick={() => history.push("/home")}
                                key={storeLocation.cityId}
                                sm={12}
                                md={6}
                                lg={4}
                                xl={3}
                            >
                                <StoreLocation household={storeLocation} />
                            </Col>
                        ))}
                    </Row>
                    <Row className="py-3">
                        <Col>
                            Didn't find a near by address?{" "}
                            <Link to={"/household/create"}>Create</Link>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
}

export default StoreAddressScreen;
