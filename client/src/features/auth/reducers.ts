import jwt from 'jsonwebtoken'
import store from "../../store";
import { useDispatch, useSelector } from 'react-redux';
import { REPLACE_TOKENS, TokensActionTypes } from './types'
import { getRefreshToken } from "./selectors"


const initialState = {
    accessToken: '',
    refreshToken: '',
    refreshTimeout: Infinity, // Time to token refresh
    accessTimeout: Infinity, // Time to token refresh
}

export default (state = initialState, action: TokensActionTypes) => {
    if (action.type === REPLACE_TOKENS) {
        try {
            const decodedAcc = jwt.decode(action.tokens.accessToken, {
                complete: true,
            }) as { [key: string]: any }
            const decodedRef = jwt.decode(action.tokens.refreshToken, {
                complete: true,
            }) as { [key: string]: any }

            return {
                ...state,
                accessToken: action.tokens.accessToken,
                refreshToken: action.tokens.refreshToken,
                accessTimeout: decodedAcc.payload.exp,
                refreshTimeout: decodedRef.payload.exp,
            }
        } catch {
            // If there was an error with parsing the token, logout the user
            return state
        }
    }
    return state
}
