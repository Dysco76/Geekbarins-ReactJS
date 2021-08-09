import "normalize.css"
import { Grid, makeStyles } from "@material-ui/core"
import { ChatList } from "./components/chat-list"
import { MessageList } from "./components/message-list"

const useStyles = makeStyles({
  app: {
    fontFamily: "Roboto, Helvetica, sans-serif",
  },
})

export function App() {
  const classes = useStyles()
  return (
    <div className={classes.app}>
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
