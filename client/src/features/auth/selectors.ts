import { AuthTokensState } from "./types";

export const getAccessToken = (state: AuthTokensState) => state.accessToken
export const getRefreshToken = (state: AuthTokensState) => state.refreshToken