import jwt from 'jsonwebtoken'
import { useDispatch, useSelector } from 'react-redux';
import { REPLACE_TOKENS, TokensActionTypes } from './types'
import { getRefreshToken } from "./selectors"

const initialState = {
    accessToken: '',
    refreshToken: '',
    refreshTimeout: Infinity, // Time to token refresh
    accessTimeout: Infinity, // Time to token refresh
}

const dispatch = useDispatch();
const refToken = useSelector(getRefreshToken)
let refreshTimeoutID: NodeJS.Timeout | null = null;

function silentRefresh() {

    fetch('http://api.fymate.co/auth/refresh', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: "Bearer " + refToken
        },
    })
        .then((r) => r.json())
        .then((r) =>
            dispatch({
                type: REPLACE_TOKENS,
                tokens: { accessToken: r.acc, refreshToken: r.ref },
            })
        )
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

            if (refreshTimeoutID !== null)
                clearTimeout(refreshTimeoutID);
            refreshTimeoutID = setTimeout(silentRefresh, Date.now() - decodedAcc.payload.exp);

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
