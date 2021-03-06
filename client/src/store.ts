import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import TokenReducer from './features/auth/reducers'
import { REPLACE_TOKENS } from './features/auth/types'
import UsernameReducer from './features/login/loginReducer'
import tagsReducer from './features/tags/tagsReducer'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  authTokens: TokenReducer,
  username: UsernameReducer,
  tags: tagsReducer
})

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

//Automatically refreshed the token
let oldTokens: any = undefined;
let timeoutID: NodeJS.Timeout;
store.subscribe(() => {
  const state = store.getState();
  if (oldTokens !== state.authTokens) {
    oldTokens = state.authTokens;

    if (timeoutID !== undefined && timeoutID !== null)
      clearTimeout(timeoutID);


    setTimeout(() => {
      if (state.authTokens.refreshToken !== "")
        fetch(process.env.REACT_APP_API_URL + '/auth/refresh', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: "Bearer " + state.authTokens.refreshToken
          },
        })
          .then((r) => r.json())
          .then((r) =>
            store.dispatch({
              type: REPLACE_TOKENS,
              tokens: { accessToken: r.acc, refreshToken: r.ref },
            })
          ).catch(() => {

            store.dispatch({
              type: REPLACE_TOKENS,
              tokens: { accessToken: "", refreshToken: "", accessTimeout: Infinity, refreshTimeout: Infinity },
            })

          })
    }, state.authTokens.accessTimeout * 1000 - Date.now());
  }
})




export default store
