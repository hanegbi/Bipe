import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [admins, setAdmins] = useState(false);

    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, successDelete, userInfo]);

    const submitSearchUsersHandler = (e) => {
        e.preventDefault();
        dispatch(listUsers(name, email, admins));
    };

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <>
            <h1>Users</h1>

            <Form inline onSubmit={submitSearchUsersHandler}>
                <Form.Group controlId="name">
                    <Form.Control
                        size="sm"
                        placeholder="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mb-2 mr-sm-2"
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Control
                        size="sm"
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-2 mr-sm-2"
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="isAdminUser">
                    <Form.Check
                        size="sm"
                        type="checkbox"
                        checked={admins}
                        label="Admins"
                        onChange={(e) => setAdmins(e.target.checked)}
                        className="mb-2 mr-sm-2"
                    ></Form.Check>
                </Form.Group>

                <Button type="submit" className="mb-2" size="sm">
                    Search
                </Button>
            </Form>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">error</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i className="fas fa-check" style={{ color: "green" }}></i>
                                    ) : (
                                        <i className="fas fa-times" style={{ color: "red" }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="light"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListScreen;
