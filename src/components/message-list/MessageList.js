import {
  Paper,
  TextField,
  InputAdornment,
  Icon,
  makeStyles,
} from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { useRef, useCallback, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router"
import { Message } from "../"
import {
  handleChangeMessageValue,
  getCurrentInput,
} from "../../store/conversations-list"
import { addMessage, getMessagesById } from "../../store/message-list"
import { getUserName } from "../../store/profile"

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "rgb(92,207,104)",
    backgroundImage:
      "linear-gradient(25deg, rgba(92,207,104,1) 11%, rgba(0,212,255,1) 96%)",
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

export const MessageList = () => {
  const { roomId } = useParams()
  const classes = useStyles()

  const messageList = useRef(null)

  const dispatch = useDispatch()

  const userName = useSelector(getUserName)
  const messages = useSelector(getMessagesById(roomId))
  const currentInput = useSelector(getCurrentInput(roomId))

  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (currentInput)
      dispatch(
        addMessage(
          {
            message: currentInput,
            author: userName,
          },
          roomId,
        ),
      )
  }

  const handleScrollBottom = useCallback(() => {
    if (messageList.current) {
      messageList.current.scrollTo(0, messageList.current.scrollHeight)
    }
  }, [messageList])

  useEffect(() => {
    handleScrollBottom()
  }, [handleScrollBottom])

  return (
    <div className={classes.wrapper}>
      <div ref={messageList} className={classes.messageList}>
        {messages.map((message) => (
          <Message message={message} key={message.id} />
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
