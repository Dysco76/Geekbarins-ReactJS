import {
  AUTH_START,
  LOGIN_SUCCESS,
  SIGN_UP_SUCCESS,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  SET_SESSION,
} from "./types"

const initialState = {
  session: null,
  sessionPending: false,
  sessionError: null,
}

export const authenticationReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case AUTH_START:
      return { ...state, sessionPending: true, sessionError: null }
    case LOGIN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return { ...state, sessionPending: false, sessionError: null }
    case LOGOUT_SUCCESS:
      return initialState
    case AUTH_ERROR:
      return { ...state, sessionPending: false, sessionError: payload }
    case SET_SESSION:
      return { ...state, session: payload }
    default:
      return state
  }
}
