import "normalize.css"
import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { firebaseAuth } from "./api/firebase"
import { PrivateRoute, PublicRoute } from "./components"
import { Chat, Login, SignUp } from "./pages"
import { setSession, getSessionInfo } from "./store/authentication"
import { getProfileFB } from "./store/profile"

const auth = firebaseAuth.getAuth()

export function App() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { session } = useSelector(getSessionInfo)

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setSession(user))
        dispatch(getProfileFB(user.uid))
      }
    })
    return unsubscribe
  }, [dispatch])

  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/">
            <Redirect to="/chat" />
          </Route>
          <PrivateRoute
            session={session}
            path={["/chat/:roomId", "/chat"]}
            component={Chat}
          />
          <PublicRoute session={session} path="/login" component={Login} />
          <PublicRoute session={session} path="/sign-up" component={SignUp} />
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

const useStyles = makeStyles({
  app: {
    fontFamily: "Roboto, Helvetica, sans-serif",
  },
})
