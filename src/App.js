import "normalize.css"
import styles from "./App.module.sass"
import { MessageList } from "./components/message-list"

export function App() {
  return (
    <div className={styles.app}>
      <MessageList />
    </div>
  )
}
