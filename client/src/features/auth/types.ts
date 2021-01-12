export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthTokensState extends AuthTokens {
  refreshTimeout: number, // Time to token refresh
  accessTimeout: number, // Time to token refresh
}

export const REPLACE_TOKENS = 'REPLACE_TOKENS'

interface ReplaceTokensAction {
  type: typeof REPLACE_TOKENS
  tokens: AuthTokens
}

// Compound type for exporting multiple types under one alias
export type TokensActionTypes = ReplaceTokensAction
