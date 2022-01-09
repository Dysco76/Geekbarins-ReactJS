import { List, ListItem, makeStyles } from "@material-ui/core"
import { useContext, useState, 
  useEffect 
} from "react"
import { useSelector } from "react-redux"
import {useParams} from 'react-router'
import { Link } from "react-router-dom"
import { AddChatModal, Loader } from ".."
import { SearchContext } from "../../pages/chat"
import { getConversationsInfo } from "../../store/conversations-list"
import { ChatBlock } from "."

export const ChatList = () => {
  const classes = useStyles()
  const { roomId } = useParams()
  const {searchString} = useContext(SearchContext)

  const { pending, error, conversations } = useSelector(getConversationsInfo)

  const [filteredConversations, setFilteredConversations] = useState([...conversations])
  
  useEffect(() => {
    if (!searchString) setFilteredConversations([...conversations])
    else setFilteredConversations(prev => prev.filter(chat => chat.title.toLowerCase().includes(searchString.toLowerCase())))
  }, [searchString, conversations])

  return (
    <div className={classes.root}>
      <div className={classes.scrollable}>
      {pending ? (
        <Loader width="100" height="100" color="#3F51B5" type="spin" className={classes.loader}/>
      ) : (
        <List component="nav" className={classes.list}>
          {filteredConversations.map((chat) => (
            <Link to={`/chat/${chat.id}`} className={classes.chatLink} key={chat.id}> 
            <ListItem
              button={true}
              selected={roomId === chat.id}
              classes={{
                root: classes.listItem,
                selected: classes.listItemSelected,
              }}
            >
            <ChatBlock chat={chat}  />
            </ListItem>
      </Link>
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
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey["A400"],
    height: "100%",
  },
  scrollable: {
    height: "100%",
    boxSizing: "border-box",
    position: "relative",
    padding: "0 0 5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    overflowX: "hidden",
    ...theme.mixins.scrollbar
  },
  loader: {
    marginTop: "40px"
  },
  addButtonWrapper: {
    padding: "5px",
    boxSizing: "border-box",
    marginTop: "auto",
    position: "sticky",
    bottom: "10px",
    marginRight: "10px",
    alignSelf: "end",
  },
  list: {
    width: "100%",
    paddingLeft: "7px"
  },

  listItem: {
    borderRadius: theme.shape.borderRadius + "px",
    overflow: "hidden",
    height: "96px",
    padding: "0",
    position: "relative",
    width: "100%"
  },

  listItemSelected: {
    backgroundColor: theme.palette.primary.main + " !important",
    "& span": {
      color: theme.palette.common.white,
    },
  },
  chatLink: {
    textDecoration: "none",
  },
}))
