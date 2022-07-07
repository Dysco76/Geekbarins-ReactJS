import { firebaseAuth } from "./firebase"

const auth = firebaseAuth.getAuth()

export const signUpWithEmailAndPassword = async(email,password) => {
    return firebaseAuth.createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
}

export const loginWithEmailAndPassword = async(email, password) => {
    return firebaseAuth.signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
}

export const logout = async() => {
    return firebaseAuth.signOut(auth)
}