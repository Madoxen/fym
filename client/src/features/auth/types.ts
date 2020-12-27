export interface AuthTokensState {
  accessToken: string
  refreshToken: string
}

export const REPLACE_TOKENS = 'REPLACE_TOKENS'

interface ReplaceTokensAction {
  type: typeof REPLACE_TOKENS
  tokens: AuthTokensState
}

// Compound type for exporting multiple types under one alias
export type TokensActionTypes = ReplaceTokensAction
