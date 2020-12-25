import { REPLACE_TOKENS, TokensActionTypes } from "./types"

const initialState = {
    accessToken: "",
    refreshToken: ""
}

export default (state = initialState, action: TokensActionTypes) => {
    switch (action.type) {
        case REPLACE_TOKENS:
            return { ...state, accessToken: action.tokens.accessToken, refreshToken: action.tokens.refreshToken }
        default:
            return state
    }
}
