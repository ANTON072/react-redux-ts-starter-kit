import { Reducer } from "redux"

// Action Creators
const LOGIN_SUCCESS = "common/LOGIN_SUCCESS"
const LOGOUT = "common/LOGOUT"

export const loginSuccess = (payload: { token: string | null }) => {
  return {
    type: LOGIN_SUCCESS as typeof LOGIN_SUCCESS,
    payload
  }
}

export const logout = () => {
  return {
    type: LOGOUT as typeof LOGOUT
  }
}

// Async Actions
export const loginAsync = () => (dispatch: any, getState: any) =>
  new Promise((resolve, reject) => {
    dispatch(loginSuccess({ token: "1234" }))
    resolve()
  })

// Reducer
type Action = ReturnType<typeof loginSuccess | typeof logout>
type State = {
  token: string | null
}

const initialState = {
  token: null
}

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, token: action.payload.token }
    }
    case LOGOUT: {
      return { ...state, token: null }
    }
    default: {
      const _: never = action
      return state
    }
  }
}

export default reducer
