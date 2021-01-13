import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { REPLACE_TOKENS } from '../features/auth/types'
import { useHistory } from 'react-router-dom'

export const Register: React.FC = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [errMessage, setErrMessage] = useState("")
    const [succesRegister, setSuccesRegister] = useState<boolean>(true)
    const dispatch = useDispatch()
    const history = useHistory()

    const onFormSubmit = (e: any) => {
        e.preventDefault()
        // TODO Validate
        if (password === '' || username === '' || passwordConfirm === '' || passwordConfirm !== password) {
            setSuccesRegister(false)
        } else {
            fetch(process.env.REACT_APP_API_URL + '/auth/register/', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                },
                mode: 'cors'
            })
                .then(async (r) => {
                    if (!r.ok) {
                        let er = ""
                        er = await r.text()
                        throw er
                    }
                    return r.json()
                })
                .then((r) => {
                    dispatch({
                        type: REPLACE_TOKENS,
                        tokens: { accessToken: r.acc, refreshToken: r.ref },
                    })
                    setSuccesRegister(true)
                    history.push({
                        pathname: '/login',
                    })
                })
                .catch((e) => {
                    setErrMessage(e)
                    setSuccesRegister(false)
                })
        }
    }

    return (
        <Form onSubmit={onFormSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                />
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </Form.Group>

            <Form.Group controlId="formBasicSecoundPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                    type="password"
                    required
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="Confirm password"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Create account
      </Button>
            {succesRegister ? null :
                <div style={{ color: "red", textAlign: "center" }} >
                    {errMessage}
                </div>}
        </Form>
    )
}
