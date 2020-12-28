import React, { Dispatch, Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAccessTokenExp, getRefreshToken } from '../features/auth/selectors';
import { REPLACE_TOKENS, TokensActionTypes } from '../features/auth/types'




function getNewTokens(dispatch: Dispatch<TokensActionTypes>, refreshToken: string) {
    fetch(process.env.API_URL + "/auth/refresh", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer  + ${refreshToken}`
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



//Empty component, used as token refresher
const TokenRefresher: React.FC = () => {

    const dispatch = useDispatch();
    const refToken = useSelector(getRefreshToken);
    const accessTokenTimeout = useSelector(getAccessTokenExp);
    const [refreshTimeoutID, setRefreshTimeoutID] = useState<NodeJS.Timeout>();
    useEffect(() => {
        //clean up
        return function cleanup() {
            if (refreshTimeoutID !== null && refreshTimeoutID !== undefined)
                clearTimeout(refreshTimeoutID);
        };
    });


    setRefreshTimeoutID(setTimeout(() => { getNewTokens(dispatch, refToken) }, accessTokenTimeout * 1000 - Date.now()));
    return (<Fragment>
        </Fragment>);
}


export default TokenRefresher
