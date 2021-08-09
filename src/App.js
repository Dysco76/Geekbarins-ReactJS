import "normalize.css"
import { Grid, makeStyles } from "@material-ui/core"
import styles from "./App.module.sass"
import { ChatList } from "./components/chat-list"
import { MessageList } from "./components/message-list"

export function App() {
  return (
    <div className={styles.app}>
      <Grid container={true}>
        <Grid item={true} xs={12} md={3}>
          <ChatList />
        </Grid>
        <Grid item={true} xs={12} md={9}>
          <MessageList />
        </Grid>
      </Grid>
    </div>
  )
}
