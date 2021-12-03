import { List, makeStyles } from "@material-ui/core"
import { useSelector } from "react-redux"
import { AddChatModal, Loader } from ".."
import { getConversationsInfo } from "../../store/conversations-list"
import { ChatBlock } from "."

export const ChatList = () => {
  const classes = useStyles()

  const { pending, error, conversations } = useSelector(getConversationsInfo)

  return (
    <div className={classes.root}>
      {pending ? (
        <Loader width="100" height="100" color="#3F51B5" type="spin" />
      ) : (
        <List component="nav" className={classes.list}>
          {conversations.map((chat) => (
            <ChatBlock chat={chat} key={chat.id} />
          ))}
        </List>
      )}

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          Failed to fetch chats. {error}
        </p>
      )}
      <div className={classes.addButtonWrapper}>
        <AddChatModal />
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    boxSizing: "border-box",
    position: "relative",
    padding: "0 0 5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      backgroundColor: "transparent",
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: theme.palette.grey["600"],
      height: "200px",
    },
  },
  addButtonWrapper: {
    padding: "5px",
    boxSizing: "border-box",
    marginTop: "auto",
    position: "sticky",
    bottom: "10px",
    alignSelf: "end",
  },
  list: {
    width: "100%",
  },
}))
