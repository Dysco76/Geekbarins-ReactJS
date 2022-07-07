import { updateProfileFB } from "../profile"
import {
  authStart,
  loginSuccess,
  logoutSuccess,
  signUpSuccess,
  authError,
} from "."

export const signUpThunk = (email, password) => async (dispatch, _, {authenticationApi}) => {
  dispatch(authStart())

  try {
    const res = await authenticationApi.signUpWithEmailAndPassword(email, password)

    const newUser = {
      id: res.user.uid,
      name: `User${String(Date.now()).slice(-4)}`,
      phone: "",
      roomsCreated: 0,
    }
    dispatch(signUpSuccess(res.user))
    dispatch(updateProfileFB(newUser))
  } catch (err) {
    dispatch(authError(err.code))
  }
}

export const loginThunk = (email, password) => async (dispatch, _, {authenticationApi}) => {
  dispatch(authStart())

  try {
    const res = await authenticationApi.sloginWithEmailAndPassword(email, password,)
    dispatch(loginSuccess(res.user))
  } catch (err) {
    dispatch(authError(err.code))
  }
}

export const logoutThunk = () => async (dispatch, _, {authenticationApi}) => {
  dispatch(authStart())

  try {
    await authenticationApi.logout()
    dispatch(logoutSuccess())
  } catch (err) {
    dispatch(authError(err.code))
  }
}
