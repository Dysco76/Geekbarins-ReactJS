import "normalize.css"
import { makeStyles } from "@material-ui/core"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { Chat } from "./pages"

const useStyles = makeStyles({
  app: {
    fontFamily: "Roboto, Helvetica, sans-serif",
  },
})

export function App() {
  const classes = useStyles()
  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/">
            <Redirect to="/chat" />
          </Route>
          <Route path={["/chat/:roomId", "/chat"]}>
            <Chat />
          </Route>
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
