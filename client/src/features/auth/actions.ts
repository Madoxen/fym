import { AuthTokensState, REPLACE_TOKENS, TokensActionTypes } from "./types";

export function replaceAuthTokens(tokens: AuthTokensState): TokensActionTypes {
    return {
        type: REPLACE_TOKENS,
        tokens: tokens
    }
}