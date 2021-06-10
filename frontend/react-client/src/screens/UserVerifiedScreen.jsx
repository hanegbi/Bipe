import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

const UserVerifiedScreen = ({ match }) => {
    const { isVerified } = match.params;
    const [counter, setCounter] = useState(5);
    const history = useHistory();
    const userVerifiedEmail = isVerified === "true";

    useEffect(() => {
        setTimeout(() => {
            if (userVerifiedEmail) {
                history.push("/login");
            } else {
                history.push("/");
            }
        }, 5000);

        setInterval(() => {
            setCounter((counter) => counter - 1);
        }, 1000);

        return () => {
            clearTimeout();
            clearInterval();
        };
    }, [history]);

    if (userVerifiedEmail) {
        return (
            <div>
                <p>Your email has been verified.</p>
                <p>You will be directed to login page in {counter}</p>
            </div>
        );
    } else {
        return (
            <div>
                <p>There was an error, your email has not been verified</p>
                <p>You will be directed to home page in {counter}</p>
            </div>
        );
    }
};

export default UserVerifiedScreen;
