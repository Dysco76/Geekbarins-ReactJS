import {
  Icon,
  InputAdornment,
  Paper,
  makeStyles,
  Input,
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
    <div className={classes.root}>
    <Paper elevation={3} className={classes.messageForm}>
      <Input
        type="text"
        className={classes.messageInput}
        fullWidth={true}
        placeholder="Type your message..."
        value={currentInput}
        onChange={(e) => {
          setCurrentInput(e.target.value)
        }}
        onBlur={(e) => {
          dispatch(handleChangeMessageValue(e.target.value, roomId))
        }}
        onKeyPress={handlePressInput}
        
          endAdornment={(
            <InputAdornment position="end">
              <Icon
                className={classes.sendButton}
                onClick={handleSendMessage}
                color="primary"
              >
                <Send />
              </Icon>
            </InputAdornment>
          )}
      />
    </Paper>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "sticky",
    bottom: "0",
    paddingBottom: "20px"
  },
  messageForm: {
    backgroundColor: theme.palette.grey['A400'],
    borderRadius: "15px",
    overflow: 'hidden'
  },
  messageInput: {
    padding: "10px",
  },

  sendButton: {
    cursor: "pointer",
  },
}))
