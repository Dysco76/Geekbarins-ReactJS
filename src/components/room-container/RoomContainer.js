import { makeStyles } from "@material-ui/core"
import { useParams } from "react-router"
import { MessageList } from ".."

export const RoomContainer = () => {
  const classes = useStyles()
  const {roomId} = useParams();

  return <div className={classes.root} style={{display: roomId === 'room-not-found' ? "none" : "flex"}}>
    <MessageList />
  </div>
}

const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
}))
