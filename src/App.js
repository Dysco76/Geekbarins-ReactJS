import { useState, useEffect } from "react";
import "normalize.css";
import styles from "./App.module.sass";
import { Message } from "./components/Message.js";

export function App() {
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState("");
  const [author, setAuthor] = useState("Anonymous");

  const sendMessage = () => {
    setMessageList((messages) => [
      ...messages,
      { value: value, author, id: Date.now() },
    ]);

    setValue("");
  };

  useEffect(() => {
    if (
      messageList.length &&
      messageList[messageList.length - 1].author !== "bot"
    ) {
      setTimeout(() => {
        setMessageList((messages) => [
          ...messages,
          { value: "Hello from bot!", author: "bot", id: Date.now() },
        ]);
      }, 1500);
    }
  }, [messageList]);

  return (
    <>
      <div className={styles.app}>
        {messageList.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </div>
      <div className={styles.messageForm}>
        <input
          type="text"
          className="author-input"
          placeholder="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <input
          type="text"
          className="message-input"
          placeholder="Your Message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button className="message-send" onClick={sendMessage}>
          Send
        </button>
      </div>
    </>
  );
}
