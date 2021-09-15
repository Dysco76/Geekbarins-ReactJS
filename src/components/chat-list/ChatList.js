import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles,
} from "@material-ui/core"
import { Group, Close } from "@material-ui/icons"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useParams, useHistory } from "react-router-dom"
import { ProfileDialog, AddChatModal, ContextMenu } from ".."
import {
  getConversations,
  deleteChatThunk,
} from "../../store/conversations-list"
import { getAllMessages } from "../../store/message-list"

const useStyles = makeStyles({
  wrapper: {
    height: "100vh",
    boxSizing: "border-box",
    border: "1px solid #BDBDBD",
    position: "relative",
    padding: "20px 0 5px 0",
    display: "flex",
    flexDirection: "column",
  },
  chatBlock: {
    textDecoration: "none",
  },

  chatTitle: {
    color: "#000",
  },

  addButtonWrapper: {
    padding: "0 5px",
    marginTop: "auto",
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

export const ChatList = () => {
  const classes = useStyles()
  const { roomId } = useParams()
  const history = useHistory()
  const conversations = useSelector(getConversations)
  const allMessages = useSelector(getAllMessages)
  const dispatch = useDispatch()

  const [contextActions] = useState([
    {
      name: "Delete room",
      func() {
        dispatch(deleteChatThunk(this.chatId))
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

  return (
    <div className={classes.wrapper}>
      <ProfileDialog />
      <List component="nav">
        {conversations.map((chat) => {
          const {
            author = "",
            message = "",
            date = "",
          } = allMessages[chat.id][allMessages[chat.id]?.length - 1] || {}

          const messageText =
            (author + message).length > 30
              ? message.slice(0, 30 - author.length) + "..."
              : message

          return (
            <div className={classes.chatWrapper} key={chat.id}>
              <Link to={`/chat/${chat.id}`} className={classes.chatBlock}>
                <ListItem button={true} selected={roomId === chat.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <Group />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <span className={classes.chatTitle}>{chat.title}</span>
                    }
                    secondary={
                      <>
                        {author ? `${author}: ${messageText}` : null}
                        <br />
                        <sub>{date}</sub>
                      </>
                    }
                  />
                </ListItem>
              </Link>
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
            </div>
          )
        })}
      </List>

      <div className={classes.addButtonWrapper}>
        <AddChatModal />
      </div>
    </div>
  )
}
