import React, { Fragment } from 'react'
import { FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { ILoginPOST } from '../components/props/Interfaces'
import { setUsername } from '../features/login/loginReducer'

export const Login: React.FC = () => {
    const dispatch = useDispatch()
    const LoginPOST: ILoginPOST = {
        username: "",
        password: ""
    }
    const SendChanges = (): void => {
        console.log(LoginPOST)
        dispatch(setUsername(LoginPOST.username));
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

            </div>
        </Fragment>
    )
}
