import { Grid } from "@material-ui/core"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router"
import {
  Switch,
  Route,
  // Redirect
} from "react-router-dom"
import {
  ChatList,
  MessageList,
  RoomContainer,
  SystemMessage,
} from "../components"
import {
  getConversationsInfo,
  getConversationsAndMessagesFB,
} from "../store/conversations-list"

export const Chat = () => {
  const { roomId } = useParams()
  const { conversations } = useSelector(getConversationsInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getConversationsAndMessagesFB())
  }, [dispatch])

  const chatExists = () => {
    return conversations?.some((chat) => chat.id === roomId)
  }

  chatExists()
  return (
    <Switch>
      <Route path={["/chat/:roomId", "/chat"]}>
        <Grid container={true}>
          <Grid item={true} xs={12} md={3}>
            <ChatList />
          </Grid>
          <Grid item={true} xs={12} md={9}>
            <RoomContainer>
              <Route exact={true} path="/chat">
                <SystemMessage message="Please select a room from the list" />
              </Route>
              <Route path="/chat/:roomId">
                {/* {chatExists() ? ( */}
                <MessageList />
                {/* ) : ( */}
                {/* <Redirect to="/chat/room-not-found" /> */}
                {/* )} */}
              </Route>
              <Route path="/chat/room-not-found">
                <SystemMessage message="This room does not exist :c" />
              </Route>
            </RoomContainer>
          </Grid>
        </Grid>
      </Route>
    </Switch>
  )
}
