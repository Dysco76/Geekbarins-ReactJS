import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core"
import { Close } from "@material-ui/icons"
import { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { ContextMenu } from "../.."
import {
  deleteChatThunk,
  subscribeToLastMessageFB,
} from "../../../store/conversations-list"
import { getUserInfo, updateRoomsCreatedFB } from "../../../store/profile"

export const ChatBlock = ({ chat }) => {
  const { roomId } = useParams()
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useSelector(getUserInfo)
  const wrapperRef = useRef(null)

  const { author = "", message = "", date = "" } = chat.lastMessage || {}
  const authorText = author.length > 12 ? author.slice(0, 12) + "..." : author
  // const messageText =
  //   (authorText + message).length > 30
  //     ? message.slice(0, 30 - authorText.length) + "..."
  //     : message

  const [titleString, setTitleString] = useState("")
  const setChatTitleLength = useCallback(() => {
    if (!wrapperRef.current) return
    const maxVisibleLength = Math.floor(wrapperRef.current.clientWidth / 22)
    setTitleString(
      chat.title.length > maxVisibleLength
        ? chat.title.slice(0, maxVisibleLength) + "...:"
        : chat.title,
    )
  }, [chat.title])

  console.log(titleString)

  const [contextActions] = useState([
    {
      name: "Delete room",
      func() {
        dispatch(deleteChatThunk(this.chatId))
        dispatch(updateRoomsCreatedFB(chat.creator.id, "decrement"))
        roomId === this.chatId && history.push("/chat")
      },
      chatId: null,
    },
    {
      name: "Cancel",
      func() {
        return false
      },
      shouldContextClose: true,
    },
  ])

  // watching for lastMessage change in FB to set new last message
  useEffect(() => {
    const unsubscribe = dispatch(subscribeToLastMessageFB(chat.id))
    return unsubscribe
  }, [dispatch, chat.id])

  useEffect(() => {
    setChatTitleLength()
    window.addEventListener("resize", setChatTitleLength)
  }, [setChatTitleLength])

  return (
    <div className={classes.chatWrapper} key={chat.id} ref={wrapperRef}>
      <Link to={`/chat/${chat.id}`} className={classes.chatBlock}>
        <ListItem
          button={true}
          selected={roomId === chat.id}
          classes={{
            root: classes.listItem,
            selected: classes.listItemSelected,
          }}
        >
          <ListItemAvatar>
            <Avatar>{chat.title[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Tooltip title={chat.title}>
                <Typography variant="body1" color="textPrimary" noWrap={true}>
                  {chat.title}
                </Typography>
              </Tooltip>
            }
            secondary={
              <>
                <div style={{ display: "flex" }}>
                  <span style={{ display: "block", maxWidth: "40%" }}>
                    <Typography noWrap={true} variant="body2">
                      {authorText && authorText + ":"}
                    </Typography>
                  </span>
                  &nbsp;
                  <span style={{ display: "block", maxWidth: "60%" }}>
                    <Typography noWrap={true} variant="body2">
                      {message}
                    </Typography>
                  </span>
                </div>
                <div>
                  <sub>{date}</sub>
                </div>
              </>
            }
          />
        </ListItem>
      </Link>
      {id === chat.creator.id || id === "inO6lM9qPISh0MTl8XcPgVKAsVf1" ? (
        <ContextMenu
          className={classes.contextMenu}
          actions={contextActions.map((action) =>
            action.name === "Delete room"
              ? { ...action, chatId: chat.id }
              : action,
          )}
        >
          <Close fontSize="small" />
        </ContextMenu>
      ) : null}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  chatBlock: {
    textDecoration: "none",
  },

  chatWrapper: {
    position: "relative",
    borderRadius: theme.shape.borderRadius + "px",
    overflow: "hidden",
    height: "96px",
  },

  listItem: {
    height: "100%",
  },

  listItemSelected: {
    backgroundColor: theme.palette.primary.main + " !important",
    "& span": {
      color: theme.palette.common.white,
    },
  },

  contextMenu: {
    position: "absolute",
    top: "0",
    right: "0",
  },
}))
