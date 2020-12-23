import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'


export const Register: React.FC = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const onFormSubmit = (e: any) => {
        e.preventDefault()
        // TODO Validate
        if (password === "" || username === "" || passwordConfirm === "") {
            console.log("BAD !!")
        } else {
            fetch("http://api.fymate.co/auth/register", {
                method: "POST", body: JSON.stringify({ email: email, username: username, password: password }), headers: {

                    "Accept": "application/json",
                    "Content-type": "application/json; charset=UTF-8",
                }
            });
        }
    }

    return (
        <Form onSubmit={onFormSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} placeholder="username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicSecoundPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Confirm password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Create account
            </Button>
        </Form>
    )
}
