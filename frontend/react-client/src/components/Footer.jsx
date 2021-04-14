import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { io } from "socket.io-client";

function Footer() {
    const [userCount, setUserCount] = useState(0);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        const socket = io();
        socket.on("count", (userCounter) => {
            setUserCount(userCounter);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <footer>
            <Container className="d-flex flex-column align-items-center m-10">
                {userInfo && userInfo.isAdmin && (
                    <Row>
                        <p className="text-center font-weight-bold">
                            {" "}
                            {`Connected Clients ${userCount}`}{" "}
                        </p>
                    </Row>
                )}
                <Row>
                    <p className="text-center">Copyright &copy; Bipe</p>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
