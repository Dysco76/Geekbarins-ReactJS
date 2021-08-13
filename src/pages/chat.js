import { Grid } from "@material-ui/core"
import { Switch, Route } from "react-router-dom"
import { ChatList, MessageList, MessageProvider } from "../components"

export const Chat = () => {
  return (
    <Switch>
      <Route path={["/chat/:roomId", "/chat"]}>
        <MessageProvider>
          {([state, actions]) => (
            <Grid container={true}>
              <Grid item={true} xs={12} md={3}>
                <ChatList {...state} />
              </Grid>
              <Grid item={true} xs={12} md={9}>
                <Route path="/chat/:roomId">
                  <MessageList {...state} {...actions} />
                </Route>
                <Route exact={true} path="/chat">
                  <h1>Select room</h1>
                </Route>
              </Grid>
            </Grid>
          )}
        </MessageProvider>
      </Route>
    </Switch>
  )
}
