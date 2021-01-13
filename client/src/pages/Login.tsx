import React, { Fragment, useState } from 'react'
import { FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { ILoginPOST } from '../components/props/Interfaces'
import { REPLACE_TOKENS } from '../features/auth/types'
import { setUsername } from '../features/login/loginReducer'
import { useHistory } from 'react-router-dom'

//no correct login / password

export const Login: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [loginSucces, setLoginSucces] = useState(true)
    const LoginPOST: ILoginPOST = {
        username: "",
        password: ""
    }

    const SendChanges = (): void => {

        fetch(process.env.REACT_APP_API_URL + '/auth/login', {
            method: 'POST',
            body: JSON.stringify(LoginPOST),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((r) => r.json())
            .then((r) => {
                dispatch({
                    type: REPLACE_TOKENS,
                    tokens: { accessToken: r.acc, refreshToken: r.ref },
                })
                dispatch(setUsername(LoginPOST.username));
                setLoginSucces(true)
                history.push({
                    pathname: '/profile',
                })
            })
            .catch(() => {
                setLoginSucces(false)
            })
    }

    return (
        <Fragment>
            <div className="log-in">
                <FormGroup>
                    <FormLabel>User name</FormLabel>
                    <FormControl
                        type="text"
                        onChange={e => LoginPOST.username = e.target.value}
                    ></FormControl>

                </FormGroup>
                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        onChange={e => LoginPOST.password = e.target.value}
                    >

                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <Button
                        className="btnFormSend"
                        variant="outline-success"
                        onClick={SendChanges}
                    >
                        Log in
                    </Button>
                </FormGroup>
                {loginSucces ? null :
                    <div style={{ color: "red", textAlign: "center" }} >
                        Your username or password is incorrect !!</div>}
            </div>
        </Fragment>
    )
}
