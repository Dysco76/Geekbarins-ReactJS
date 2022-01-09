import {
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core"
import { Close } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory} from "react-router"
import { ChatAvatar, ContextMenu } from "../.."
import { deleteChatThunk,subscribeToLastMessageFB} from "../../../store/conversations-list"
import { getUserInfo, updateRoomsCreatedFB } from "../../../store/profile"

export const ChatBlock = ({ chat }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useSelector(getUserInfo)

  const { author = "", message = "", date = "" } = chat.lastMessage || {}
  const authorText = author.length > 12 ? author.slice(0, 12) + "..." : author

  const [contextActions] = useState([
    {
      name: "Delete room",
      func() {
        dispatch(deleteChatThunk(this.chatId))
        dispatch(updateRoomsCreatedFB(chat.creator.id, "decrement"))
        history.push('/chat')
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

  return (
    <>
          <ListItemAvatar className={classes.avatar}>
            <ChatAvatar chat={chat} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Tooltip title={chat.title} placement="top-start" >
                <Typography variant="body1" color="textPrimary" noWrap={true}>
                  {chat.title}
                </Typography>
              </Tooltip>
            }
            secondaryTypographyProps={{component:"div"}}
            secondary={
              <>
                <div style={{ display: "flex" }}>
                  <span style={{ display: "block", maxWidth: "40%" }}>
                    <Typography noWrap={true} variant="body2" >
                      {authorText && authorText + ":"}
                    </Typography>
                  </span>
                  &nbsp;
                  <span style={{ display: "block", maxWidth: "60%" }}>
                    <Typography noWrap={true} variant="body2" >
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
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    display: "flex",
    justifyContent: "center"
  },
  contextMenu: {
    position: "absolute",
    top: "0",
    right: "0",
  },
}))
