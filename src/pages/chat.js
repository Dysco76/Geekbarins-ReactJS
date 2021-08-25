import { Grid } from "@material-ui/core"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { Switch, Route, Redirect } from "react-router-dom"
import { ChatList, MessageList } from "../components"
import { getConversations } from "../store/conversations-list"

export const Chat = () => {
  const { roomId } = useParams()
  const conversations = useSelector(getConversations)

  const chatExists = conversations.some((chat) => chat.id === roomId)

  return (
    <Switch>
      <Route path={["/chat/:roomId", "/chat"]}>
        <Grid container={true}>
          <Grid item={true} xs={12} md={3}>
            <ChatList />
          </Grid>
          <Grid item={true} xs={12} md={9}>
            <Route exact={true} path="/chat">
              <h1>Select room</h1>
            </Route>
            <Route path="/chat/:roomId">
              {chatExists ? (
                <MessageList />
              ) : (
                <Redirect to="/chat/room-not-found" />
              )}
            </Route>
            <Route path="/chat/room-not-found">
              <h1>This room does not exist :c</h1>
            </Route>
          </Grid>
        </Grid>
      </Route>
    </Switch>
  )
}
