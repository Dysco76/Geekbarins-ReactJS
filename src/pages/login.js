import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { AuthTemplate, AuthForm } from "../components"
import { loginThunk } from "../store/authentication"

export const Login = () => {
  const dispatch = useDispatch()

  const handleLogin = (email, password) => {
    dispatch(loginThunk(email, password))
  }
  return (
    <AuthTemplate
      link={<Link to="/sign-up">Don&apos;t have an account? Sign Up</Link>}
    >
      <AuthForm title="Login" handleSubmit={handleLogin} />
    </AuthTemplate>
  )
}
