import { onChildAdded, ref } from "@firebase/database"
import { List, makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { ProfileDialog, AddChatModal, Loader } from ".."
import { db } from "../../api/firebase"
import { getConversationsInfo } from "../../store/conversations-list"
import { ChatBlock } from "."

export const ChatList = () => {
  const classes = useStyles()
  const { roomId } = useParams()

  const { pending, error, conversations } = useSelector(getConversationsInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    const conversationsRef = ref(db, `conversations`)
    const unsubscribeAdded = onChildAdded(conversationsRef, (snapshot) => {
      console.log(snapshot.val())
    })

    return () => {
      unsubscribeAdded()
    }
  }, [dispatch, roomId])

  return (
    <div className={classes.wrapper}>
      <ProfileDialog />
      {pending ? (
        <Loader width="100" height="100" color="#3F51B5" type="spin" />
      ) : (
        <List component="nav" className={classes.list}>
          {conversations.map((chat) => (
            <ChatBlock chat={chat} roomId={chat.id} key={chat.id} />
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
    padding: "20px 0 5px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  addButtonWrapper: {
    padding: "0 5px",
    marginTop: "auto",
  },

  list: {
    width: "100%",
  },
})
