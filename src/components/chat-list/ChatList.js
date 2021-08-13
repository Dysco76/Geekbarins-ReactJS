import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles,
} from "@material-ui/core"
import { Group } from "@material-ui/icons"
import { Link, useParams } from "react-router-dom"

const useStyles = makeStyles({
  wrapper: {
    height: "100vh",
    boxSizing: "border-box",
    border: "1px solid #BDBDBD",
  },
  chatBlock: {
    textDecoration: "none",
  },
})

export const ChatList = ({ conversations, allMessages }) => {
  const classes = useStyles()
  const { roomId } = useParams()

  return (
    <List component="nav" className={classes.wrapper}>
      {conversations.map((chat) => {
        const lastMessage =
          allMessages[chat.id][allMessages[chat.id].length - 1]

        return (
          <Link
            key={chat.id}
            to={`/chat/${chat.id}`}
            className={classes.chatBlock}
          >
            <ListItem button={true} selected={roomId === chat.id}>
              <ListItemAvatar>
                <Avatar>
                  <Group />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={chat.title}
                secondary={`${lastMessage.author}: ${lastMessage.message}`}
              />
            </ListItem>
          </Link>
        )
      })}
    </List>
  )
}
