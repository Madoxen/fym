import { AuthTokensState } from './types'

export const getAccessToken = (state: AuthTokensState) => state.accessToken
export const getRefreshToken = (state: AuthTokensState) => state.refreshToken
export const getAccessTokenExp = (state: AuthTokensState) => state.accessTimeout
export const getRefreshTokenExp = (state: AuthTokensState) => state.refreshTimeout
