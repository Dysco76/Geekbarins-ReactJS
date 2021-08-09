import {
  TextField,
  InputAdornment,
  IconButton,
  makeStyles,
} from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { useState, useEffect, useRef } from "react"
import { Message } from "../message"

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
    minHeight: "90vh",
    padding: "20px",
    boxSizing: "border-box",
  },
  messageList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  messageForm: {
    width: "95%",
    position: "absolute",
    bottom: "10px",
    backgroundColor: "transparent",
    left: "50%",
    transform: "translateX(-50%)",
  },
  messageInput: {
    backgroundColor: "#e0f2f1",
  },
})

export const MessageList = () => {
  const classes = useStyles()

  const [messageList, setMessageList] = useState([])
  const [value, setValue] = useState("")
  const inputEl = useRef(null)

  const sendMessage = () => {
    setMessageList((messages) => [
      ...messages,
      { value, author: "User", id: Date.now() },
    ])

    setValue("")
  }

  useEffect(() => {
    if (
      messageList.length &&
      messageList[messageList.length - 1].author !== "bot"
    ) {
      setTimeout(() => {
        setMessageList((messages) => [
          ...messages,
          { value: "Hello from bot!", author: "bot", id: Date.now() },
        ])
      }, 1500)
    }

    inputEl.current.focus()
  }, [messageList])

  return (
    <div className={classes.wrapper}>
      <div className={classes.messageList}>
        {messageList.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </div>

      <div className={classes.messageForm}>
        <TextField
          inputRef={inputEl}
          type="text"
          className={classes.messageInput}
          fullWidth={true}
          label="Your Message"
          variant="filled"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={sendMessage} color="primary">
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  )
}
