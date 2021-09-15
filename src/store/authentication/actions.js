import {
  AUTH_START,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  SIGN_UP_SUCCESS,
  SET_SESSION,
} from "./types"

export const authStart = () => ({
  type: AUTH_START,
})
export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
})
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
})

export const signUpSuccess = () => ({
  type: SIGN_UP_SUCCESS,
})
export const authError = (data) => ({
  type: AUTH_ERROR,
  payload: data,
})
export const setSession = (user) => ({
  type: SET_SESSION,
  payload: user,
})
