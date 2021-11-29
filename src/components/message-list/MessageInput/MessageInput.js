import {
  Icon,
  InputAdornment,
  Paper,
  TextField,
  makeStyles,
} from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { firebaseAuth } from "../../../api/firebase"
import {
  getCurrentInput,
  getExistingMessageId,
  handleChangeMessageValue,
} from "../../../store/conversations-list"
import { editMessageThunk, sendMessageThunk } from "../../../store/message-list"
import { getUserName } from "../../../store/profile"
import { formatDate } from "../../../utils"

export const MessageInput = () => {
  const classes = useStyles()
  const { roomId } = useParams()

  const auth = firebaseAuth.getAuth()

  const dispatch = useDispatch()

  const userName = useSelector(getUserName)
  const storedInput = useSelector(getCurrentInput(roomId))
  const existingMessageId = useSelector(getExistingMessageId(roomId))

  const [currentInput, setCurrentInput] = useState("")

  useEffect(() => {
    setCurrentInput(storedInput)
  }, [storedInput, roomId])

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
        setCurrentInput(""),
      )
    }
  }

  return (
    <Paper elevation={3} className={classes.messageForm}>
      <TextField
        type="text"
        className={classes.messageInput}
        fullWidth={true}
        placeholder="Write your message..."
        value={currentInput}
        onChange={(e) => {
          setCurrentInput(e.target.value)
        }}
        onBlur={(e) => {
          dispatch(handleChangeMessageValue(e.target.value, roomId))
        }}
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
  )
}

const useStyles = makeStyles({
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
