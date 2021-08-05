import { useState, useEffect } from "react";
import "normalize.css";
import styles from "./App.module.sass";
import { Message } from "./components/Message.js";

export function App() {
  const [messageList, setMessageList] = useState([]);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const sendMessage = () => {
    setMessageList((messages) => [
      ...messages,
      { text, author: author || "Anonymous", id: Date.now() },
    ]);
  };

  useEffect(() => {
    if (
      messageList.length &&
      messageList[messageList.length - 1].author !== "bot"
    ) {
      setTimeout(() => {
        setMessageList((messages) => [
          ...messages,
          { text: `Echo: ${text}`, author: "bot", id: Date.now() },
        ]);
      }, 1500);

      setText("");
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
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button className="message-send" onClick={sendMessage}>
          Send
        </button>
      </div>
    </>
  );
}
