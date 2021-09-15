import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { AuthTemplate, AuthForm } from "../components"
import { signUpThunk } from "../store/authentication"

export const SignUp = () => {
  const dispatch = useDispatch()
  const handleSignUp = (email, password) => {
    dispatch(signUpThunk(email, password))
  }

  return (
    <AuthTemplate
      link={<Link to="/login">Already have an account? Login</Link>}
    >
      <AuthForm title="Sign Up" handleSubmit={handleSignUp} />
    </AuthTemplate>
  )
}
