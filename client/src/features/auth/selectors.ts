
export const getAccessToken = (state: any): string => state.authTokens.accessToken
export const getRefreshToken = (state: any): string => state.authTokens.refreshToken
export const getAccessTokenExp = (state: any): string => state.authTokens.accessTimeout
export const getRefreshTokenExp = (state: any): string => state.authTokens.refreshTimeout
