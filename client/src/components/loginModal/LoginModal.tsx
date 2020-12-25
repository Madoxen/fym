import React, { FormEvent, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { REPLACE_TOKENS } from '../../features/auth/types';

const LoginModal = () => {
    const [show, setShow] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        fetch("http://api.fymate.co/auth/login", {
            method: "POST", body: JSON.stringify({ username: login, password: password }), headers: {
                "Accept": "application/json",
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(r => r.json()).then(r => 
            dispatch({
                type: REPLACE_TOKENS,
                tokens: { accessToken: r.acc, refreshToken: r.ref }
            })
        );
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Login
            </Button>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header>
                    <Modal.Title>Login to your fymate account</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Login</Form.Label>
                            <Form.Control onChange={(e) => setLogin(e.target.value)} type="text" placeholder="Enter login" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LoginModal;