import { useState, useEffect } from "react"
import { Message } from "../message"
import styles from "./MessageList.module.sass"

export const MessageList = () => {
  const [messageList, setMessageList] = useState([])
  const [value, setValue] = useState("")

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
  }, [messageList])

  return (
    <>
      {messageList.map((message) => (
        <Message message={message} key={message.id} />
      ))}

      <div className={styles.messageForm}>
        <input
          type="text"
          className="message-input"
          placeholder="Your Message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="message-send" onClick={sendMessage}>
          Send
        </button>
      </div>
    </>
  )
}
