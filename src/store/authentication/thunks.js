import { firebaseAuth } from "../../api/firebase"

import { updateProfileFB } from "../profile"
import {
  authStart,
  loginSuccess,
  logoutSuccess,
  signUpSuccess,
  authError,
} from "."

const auth = firebaseAuth.getAuth()

export const signUpThunk = (email, password) => async (dispatch) => {
  dispatch(authStart())

  const auth = firebaseAuth.getAuth()

  try {
    const res = await firebaseAuth.createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )

    const newUser = {
      id: res.user.uid,
      name: `User${String(Date.now()).slice(-4)}`,
      phone: "",
    }
    dispatch(signUpSuccess(res.user))
    dispatch(updateProfileFB(newUser))
  } catch (err) {
    dispatch(authError(err.code))
  }
}

export const loginThunk = (email, password) => async (dispatch) => {
  dispatch(authStart())

  try {
    const res = await firebaseAuth.signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    dispatch(loginSuccess(res.user))
  } catch (err) {
    dispatch(authError(err.code))
  }
}

export const logoutThunk = () => async (dispatch) => {
  dispatch(authStart())

  try {
    await firebaseAuth.signOut(auth)
    dispatch(logoutSuccess())
  } catch (err) {
    dispatch(authError(err.code))
  }
}
