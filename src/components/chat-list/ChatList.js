import { List, makeStyles } from "@material-ui/core"
import { useSelector } from "react-redux"
import { ProfileDialog, AddChatModal, Loader } from ".."
import { getConversationsInfo } from "../../store/conversations-list"
import { ChatBlock } from "."

export const ChatList = () => {
  const classes = useStyles()

  const { pending, error, conversations } = useSelector(getConversationsInfo)

  return (
    <div className={classes.wrapper}>
      <ProfileDialog />
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

const useStyles = makeStyles({
  wrapper: {
    height: "100vh",
    boxSizing: "border-box",
    border: "1px solid #BDBDBD",
    position: "relative",
    padding: "20px 0 0 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    overflowX: "hidden",
  },

  addButtonWrapper: {
    padding: "5px",
    boxSizing: "border-box",
    marginTop: "auto",
    position: "sticky",
    bottom: "0",
    backgroundColor: "#fff",
    width: "100%",
  },

  list: {
    width: "100%",
  },
})
