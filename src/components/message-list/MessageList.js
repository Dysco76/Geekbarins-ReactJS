import {
  Paper,
  TextField,
  InputAdornment,
  Icon,
  makeStyles,
} from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { useState, useEffect, useRef } from "react"
import { Message } from "../message"

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "rgb(92,207,104)",
    background:
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
  const classes = useStyles()

  const [messageList, setMessageList] = useState([])
  const [value, setValue] = useState("")
  const inputEl = useRef(null)

  const sendMessage = () => {
    if (value) {
      setMessageList((messages) => [
        ...messages,
        { value, author: "User", id: Date.now() },
      ])

      setValue("")
    }
  }

  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      sendMessage()
    }
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

      <Paper elevation={3} className={classes.messageForm}>
        <TextField
          inputRef={inputEl}
          type="text"
          className={classes.messageInput}
          fullWidth={true}
          placeholder="Your Message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handlePressInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon
                  className={classes.sendButton}
                  onClick={sendMessage}
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
