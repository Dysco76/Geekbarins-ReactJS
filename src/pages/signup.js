import { useDispatch } from "react-redux"
import { AuthTemplate, AuthForm } from "../components"
import { signUpThunk } from "../store/authentication"

export const SignUp = () => {
  const dispatch = useDispatch()
  const handleSignUp = (email, password) => {
    dispatch(signUpThunk(email, password))
  }

  return (
    <AuthTemplate
    link={{path: "/login", text: "Already have an account? Login"}}
    >
      <AuthForm title="Sign Up" handleSubmit={handleSignUp} />
    </AuthTemplate>
  )
}
