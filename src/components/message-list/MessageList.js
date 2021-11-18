import { makeStyles } from "@material-ui/core"
import { useRef, useCallback, useEffect, memo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, Redirect } from "react-router"
import { Message, Loader, SystemMessage, MessageInput } from "../"
import {
  getMessagesById,
  getMessagesInfo,
  subscribeToMessagesFB,
} from "../../store/message-list"

export const MessageList = memo(() => {
  const { roomId } = useParams()
  const classes = useStyles()

  const messageList = useRef()

  const dispatch = useDispatch()

  const messages = useSelector(getMessagesById(roomId))
  const { pending, error } = useSelector(getMessagesInfo)

  const handleScrollBottom = useCallback(() => {
    if (messageList.current && !pending && messages) {
      messageList.current.scrollTo(0, messageList.current.scrollHeight)
    }
  }, [messageList, pending, messages])

  useEffect(() => {
    handleScrollBottom()
  }, [handleScrollBottom])

  useEffect(() => {
    const unsubscribeFromMessages = dispatch(subscribeToMessagesFB(roomId))
    return unsubscribeFromMessages
  }, [dispatch, roomId])

  if (pending)
    return <Loader width="100" height="100" color="#3F51B5" type="spin" />

  if (error)
    return (
      <SystemMessage
        message={`Failed to fetch messages. ${error}`}
        error={true}
      />
    )

  return !messages ? (
    <Redirect to="/chat/room-not-found" />
  ) : (
    <div className={classes.wrapper}>
      <div ref={messageList} className={classes.messageList}>
        {messages.length > 1 &&
          messages.map((message) => (
            <Message message={message} key={message.id} roomId={roomId} />
          ))}
      </div>

      <MessageInput />
    </div>
  )
})

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  messageList: {
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "auto",
  },
})
