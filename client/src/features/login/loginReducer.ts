
const initialState = {
  username: ""
}

export const SET_USERNAME = 'SET_USERNAME'

interface ISetUsername{
    type: typeof SET_USERNAME
    username: string;
}

interface IUsernameState
{
    username: string;
}
export type LoginActionTypes = ISetUsername 


export default (state = initialState, action: LoginActionTypes) => {
    if (action.type === SET_USERNAME) {
        
        return {
            ...state,
            username: action.username,
        }
    }
    return state
}

export function setUsername(name: string): ISetUsername {
    return {
        type: SET_USERNAME,
        username: name,
    }
}

export const getUsername = (state: any) => state.username.username
