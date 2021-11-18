import { Paper, makeStyles } from "@material-ui/core"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { ContextMenu } from ".."
import { firebaseAuth } from "../../api/firebase"
import {
  handleChangeMessageValue,
  setMessageId,
} from "../../store/conversations-list"
import { removeMessageThunk } from "../../store/message-list"

const auth = firebaseAuth.getAuth()

export function Message({
  message: { message, author, authorId, date, id },
  roomId,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [contextActions, setContextActions] = useState([])

  // set context actions depending if the user is the author or the admin
  useEffect(() => {
    // remove existing context actions on re-render
    setContextActions([])
    if (authorId === auth.currentUser.uid) {
      setContextActions((prevState) => [
        ...prevState,
        {
          name: "Edit message",
          func() {
            console.log("editing", message, roomId)
            dispatch(handleChangeMessageValue(message, roomId))
            dispatch(setMessageId(id, roomId))
          },
          shouldContextClose: true,
        },
      ])
    }

    if (
      authorId === auth.currentUser.uid ||
      auth.currentUser.uid === "inO6lM9qPISh0MTl8XcPgVKAsVf1" // admin uid
    ) {
      setContextActions((contextActions) => [
        ...contextActions,
        {
          name: "Delete message",
          func() {
            dispatch(removeMessageThunk(id, roomId))
          },
        },
      ])
    }
  }, [authorId, dispatch, id, message, roomId])

  if (id === "shadowMessage") return null

  return (
    <Paper
      className={`${classes.message} ${classes.sb1} ${
        authorId !== auth.currentUser.uid ? classes.messageIncoming : ""
      }`}
      elevation={3}
    >
      <div className={classes.messageContent}>
        <p className={classes.author}>{author}:</p> <span>{message}</span>
        <p className={classes.messageDate}>
          <sub>{date}</sub>
        </p>
      </div>
      <ContextMenu actions={contextActions} className={classes.contextMenu} />
    </Paper>
  )
}

const useStyles = makeStyles({
  message: {
    position: "relative",
    margin: "10px 0",
    marginRight: "5%",
    alignSelf: "flex-end",
    backgroundColor: "#e0f2f1",
    maxWidth: "500px",
    textAlign: "left",
    borderRadius: "5px",
    padding: "10px",
    overflowWrap: "break-word",

    "&::before": {
      content: '""',
      width: "0px",
      height: "0px",
      position: "absolute",
      borderLeft: "10px solid #e0f2f1",
      borderRight: "10px solid transparent",
      borderTop: "10px solid #e0f2f1",
      borderBottom: "10px solid transparent",
      right: "-10px",
      top: "6px",
    },
  },

  messageIncoming: {
    marginLeft: "5%",
    alignSelf: "flex-start",
    backgroundColor: "#fff",

    "&::before": {
      content: '""',
      width: "0px",
      height: "0px",
      position: "absolute",
      borderLeft: "10px solid transparent",
      borderRight: "10px solid #fff",
      borderTop: "10px solid #fff",
      borderBottom: "10px solid transparent",
      left: "-10px",
      top: "6px",
    },
  },

  messageContent: {
    display: "flex",
    flexDirection: "column",
    fontSize: "20px",
  },

  author: {
    color: "#4caf50",
    margin: 0,
    padding: "0 25px 0 0",
  },

  messageDate: {
    margin: "0px",
    alignSelf: "flex-end",
  },

  contextMenu: {
    position: "absolute",
    top: "0",
    right: "0",
  },
})
