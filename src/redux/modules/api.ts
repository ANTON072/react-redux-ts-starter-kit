import { Reducer } from "redux"

// Action Creators
const ERROR = "api/ERROR"

export const setError = (payload: {
  errorMessage: string
  errorType: "CLIENT_ERROR" | "SERVER_ERROR" | null
}) => {
  return {
    type: ERROR as typeof ERROR,
    payload
  }
}

// Reducer
type Action = ReturnType<typeof setError>
type State = {
  errorType: "CLIENT_ERROR" | "SERVER_ERROR" | null
  errorMessage: string | null
}

const initialState = {
  errorType: null,
  errorMessage: null
}

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case ERROR: {
      return {
        ...state,
        errorType: action.payload.errorType,
        errorMessage: action.payload.errorMessage
      }
    }
    default: {
      // const _: never = action
      return state
    }
  }
}

export default reducer
