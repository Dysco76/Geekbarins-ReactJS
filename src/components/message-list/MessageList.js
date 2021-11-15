import {
  Paper,
  TextField,
  InputAdornment,
  Icon,
  makeStyles,
} from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { nanoid } from "nanoid"
import { useRef, useCallback, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, Redirect } from "react-router"
import { Message, Loader, SystemMessage } from "../"
import { firebaseAuth } from "../../api/firebase"
import {
  handleChangeMessageValue,
  getCurrentInput,
  getExistingMessageId,
} from "../../store/conversations-list"
import {
  sendMessageThunk,
  getMessagesById,
  getMessagesInfo,
  editMessageThunk,
  subscribeToMessagesFB,
} from "../../store/message-list"
import { getUserName } from "../../store/profile"
import { formatDate } from "../../utils"

export const MessageList = () => {
  const { roomId } = useParams()
  const classes = useStyles()
  const auth = firebaseAuth.getAuth()

  const messageList = useRef()

  const dispatch = useDispatch()

  const userName = useSelector(getUserName)
  const messages = useSelector(getMessagesById(roomId))
  const { pending, error } = useSelector(getMessagesInfo)
  const currentInput = useSelector(getCurrentInput(roomId))
  const existingMessageId = useSelector(getExistingMessageId(roomId))

  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (!currentInput) return

    if (existingMessageId) {
      dispatch(
        editMessageThunk(
          {
            message: currentInput,
            id: existingMessageId,
          },
          roomId,
        ),
      )
    } else {
      dispatch(
        sendMessageThunk(
          {
            message: currentInput,
            author: userName,
            date: formatDate(new Date()),
            id: String(Date.now()) + nanoid(),
            authorId: auth.currentUser.uid,
          },
          roomId,
        ),
      )
    }
  }

  const handleScrollBottom = useCallback(() => {
    if (messageList.current && !pending) {
      messageList.current.scrollTo(0, messageList.current.scrollHeight)
    }
  }, [messageList, pending])

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

      <Paper elevation={3} className={classes.messageForm}>
        <TextField
          type="text"
          className={classes.messageInput}
          fullWidth={true}
          placeholder="Write your message..."
          value={currentInput}
          onChange={(e) =>
            dispatch(handleChangeMessageValue(e.target.value, roomId))
          }
          onKeyPress={handlePressInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon
                  className={classes.sendButton}
                  onClick={handleSendMessage}
                  color="primary"
                >
                  <Send />
                </Icon>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    </div>
  )
}

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
  messageForm: {
    width: "100%",
    position: "sticky",
    bottom: "0",
  },
  messageInput: {
    backgroundColor: "#fff",
    padding: "10px",
  },

  sendButton: {
    marginRight: "20px",
    marginBottom: "10px",
    cursor: "pointer",
  },
})
