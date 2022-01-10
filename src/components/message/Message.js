import { Paper, makeStyles, Typography, Tooltip } from "@material-ui/core"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { ContextMenu } from ".."
import { firebaseAuth } from "../../api/firebase"
import {
  handleChangeMessageValue,
  setMessageId,
} from "../../store/conversations-list"
import { removeMessageThunk } from "../../store/message-list"
import { formatDate, getTimeFromDate } from "../../utils"

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
        <Typography variant="body1" className={classes.author}>{author}:</Typography> 
        <Typography variant="subtitle1" className={classes.messageText}>{message} <Tooltip title={formatDate(date)} placement="bottom-start">
        <Typography className={classes.messageDate} variant="caption" component="sub">
          {getTimeFromDate(date)}
        </Typography>
        </Tooltip></Typography>
        
      </div>
      <ContextMenu actions={contextActions} className={classes.contextMenu} />
    </Paper>
  )
}

const useStyles = makeStyles(theme => ({
  message: {
    color: theme.palette.grey["50"],
    position: "relative",
    margin: "10px 0",
    marginRight: "5%",
    alignSelf: "flex-end",
    backgroundColor: theme.palette.primary.main,
    maxWidth: "500px",
    textAlign: "left",
    borderRadius: "13px",
    padding: "10px",
    overflowWrap: "break-word",

    "&::before": {
      content: '""',
      width: "0px",
      height: "0px",
      position: "absolute",
      borderLeft: `10px solid ${theme.palette.primary.main}`,
      borderRight: "10px solid transparent",
      borderTop: `10px solid ${theme.palette.primary.main}`,
      borderBottom: "10px solid transparent",
      right: "-10px",
      top: "6px",
    },
  },

  messageIncoming: {
    color: "#64CE6C",
    marginLeft: "5%",
    alignSelf: "flex-start",
    backgroundColor: theme.palette.grey["A400"],
    "&::before": {
      borderLeft: "10px solid transparent",
      borderRight: `10px solid ${theme.palette.grey["A400"]}`,
      borderTop: `10px solid ${theme.palette.grey["A400"]}`,
      borderBottom: "10px solid transparent",
      left: "-10px",
    },
  },
  messageContent: {
    display: "flex",
    flexDirection: "column",
  },
  author: {
    margin: 0,
    padding: "0 25px 0 0",
  },
  messageText: {
    color: theme.palette.grey["50"],
    display: "flex",
    justifyContent: "space-between"
  },
  messageDate: {
    color: theme.palette.grey["400"],
    margin: "0px",
    marginLeft: "5px",
    alignSelf: "flex-end",
  },
  contextMenu: {
    position: "absolute",
    top: "0",
    right: "0",
  },
}))
