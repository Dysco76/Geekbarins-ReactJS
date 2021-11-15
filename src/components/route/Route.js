import { Route, Redirect } from "react-router-dom"

export const PrivateRoute = ({ session, ...rest }) => {
  return session ? <Route {...rest} /> : <Redirect to="/login" />
}
export const PublicRoute = ({ session, ...rest }) => {
  return !session ? <Route {...rest} /> : <Redirect to="/" />
}
