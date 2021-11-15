import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Tooltip,
} from "@material-ui/core"
import { Close, Group } from "@material-ui/icons"
import { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { ContextMenu } from "../.."
import {
  deleteChatThunk,
  subscribeToLastMessageFB,
} from "../../../store/conversations-list"
import { getUserInfo, updateRoomsCreatedFB } from "../../../store/profile"

export const ChatBlock = ({ chat, roomId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useSelector(getUserInfo)
  const wrapperRef = useRef(null)

  const { author = "", message = "", date = "" } = chat.lastMessage || {}
  const authorText = author.length > 14 ? author.slice(0, 14) + "..." : author
  const messageText =
    (authorText + message).length > 30
      ? message.slice(0, 30 - authorText.length) + "..."
      : message

  const [titleString, setTitleString] = useState("")
  const setChatTitleLength = useCallback(() => {
    const maxVisibleLength = Math.floor(wrapperRef.current.clientWidth / 22)
    setTitleString(
      chat.title.length > maxVisibleLength
        ? chat.title.slice(0, maxVisibleLength) + "..."
        : chat.title,
    )
  }, [chat.title])

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
        <ListItem button={true} selected={roomId === chat.id}>
          <ListItemAvatar>
            <Avatar>
              <Group />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Tooltip title={chat.title}>
                <span className={classes.chatTitle}>{titleString}</span>
              </Tooltip>
            }
            secondary={
              <>
                {author ? `${authorText}: ${messageText}` : null}
                <br />
                <sub>{date}</sub>
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

const useStyles = makeStyles({
  chatBlock: {
    textDecoration: "none",
  },

  chatTitle: {
    color: "#000",
  },

  chatWrapper: {
    position: "relative",
  },

  contextMenu: {
    position: "absolute",
    top: "0",
    right: "0",
  },
})
