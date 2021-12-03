// import { Grid } from "@material-ui/core"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
// import { useParams } from "react-router"
// import { Switch, Route } from "react-router-dom"
import { Layout, Header, ChatList, MessageList } from "../components"
import {
  // getConversationsInfo,
  subscribeToChatsFB,
} from "../store/conversations-list"
import { subscribeToMessageRoomsFB } from "../store/message-list"

export const Chat = () => {
  // const { roomId } = useParams()
  // const { conversations } = useSelector(getConversationsInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe1 = dispatch(subscribeToChatsFB())
    const unsubscribe2 = dispatch(subscribeToMessageRoomsFB())

    return () => {
      unsubscribe1()
      unsubscribe2()
    }
  }, [dispatch])
  return (
    <Layout header={<Header />} sidebar={<ChatList />} main={<MessageList />} />
  )
}
