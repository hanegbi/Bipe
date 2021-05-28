import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function StoreLocation({ household }) {
    const handler = (event) => {
        localStorage.setItem("cityId", household.cityId);
    }

    return (
        <Card className="my-3 p-3 rounded" onClick={handler}>
            <Link to={`/`}>{/*${household.cityId}*/}
                <Card.Img src={"https://vusu82kigqv1hnthm3qtdqed-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Household-Square-White-Border.svg"} variant="top" height="180" width="170" />
            </Link>
            <Card.Body>
                <Link to={'/'}> {/*`/${household.cityId}`*/}
                    <Card.Title as="div">
                        <strong>{household.street} {household.city}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default StoreLocation;