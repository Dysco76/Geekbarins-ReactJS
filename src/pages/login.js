import { useDispatch } from "react-redux"
// import { Link } from "react-router-dom"
import { AuthTemplate, AuthForm } from "../components"
import { loginThunk } from "../store/authentication"

export const Login = () => {
  const dispatch = useDispatch()

  const handleLogin = (email, password) => {
    dispatch(loginThunk(email, password))
  }
  return (
    <AuthTemplate
      link={{path: "/sign-up", text: "Don't have an account? Sign Up"}}
    >
      <AuthForm title="Login" handleSubmit={handleLogin} />
    </AuthTemplate>
  )
}
