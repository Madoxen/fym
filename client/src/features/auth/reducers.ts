import jwt from 'jsonwebtoken'
<<<<<<< HEAD
import { REPLACE_TOKENS, TokensActionTypes } from './types'
=======
import store from "../../store";
import { useDispatch, useSelector } from 'react-redux';
import { REPLACE_TOKENS, TokensActionTypes } from './types'
import { getRefreshToken } from "./selectors"
>>>>>>> 26af0e751f9663eb7fd5fc2966f4c6e312fec657


const initialState = {
    accessToken: '',
    refreshToken: '',
    refreshTimeout: Infinity, // Time to token refresh
    accessTimeout: Infinity, // Time to token refresh
}
let refreshTimeoutID: NodeJS.Timeout | null = null;



function silentRefresh() {

<<<<<<< HEAD
   
=======
   /* const dispatch = useDispatch()
    const refToken = useSelector(getRefreshToken)

    fetch(process.env.API_URL + "/auth/refresh", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer  + ${refToken}`
        },
    })
        .then((r) => r.json())
        .then((r) =>
            dispatch({
                type: REPLACE_TOKENS,
                tokens: { accessToken: r.acc, refreshToken: r.ref },
            })
        )*/
>>>>>>> 26af0e751f9663eb7fd5fc2966f4c6e312fec657
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

            console.log((decodedAcc.payload.exp * 1000 - Date.now()));
            refreshTimeoutID = setTimeout(silentRefresh, 5000);

            return {
                ...state,
                accessToken: action.tokens.accessToken,
                refreshToken: action.tokens.refreshToken,
                accessTimeout: decodedAcc.payload.exp,
                refreshTimeout: decodedRef.payload.exp,
            }
        } catch {
            if (refreshTimeoutID !== null)
                clearTimeout(refreshTimeoutID);
            // If there was an error with parsing the token, logout the user
            return state
        }
    }
    return state
}
