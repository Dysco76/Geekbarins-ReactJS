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

  chatTitle: {
    color: "#000",
  },
})

export const ChatList = ({ conversations, allMessages }) => {
  const classes = useStyles()
  const { roomId } = useParams()

  return (
    <List component="nav" className={classes.wrapper}>
      {conversations.map((chat) => {
        const { author, message, date } =
          allMessages[chat.id][allMessages[chat.id].length - 1]

        const messageText =
          (author + message).length > 26
            ? message.slice(0, 26 - author.length) + "..."
            : message

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
                primary={
                  <span className={classes.chatTitle}>{chat.title}</span>
                }
                secondary={
                  <>
                    {`${author}: ${messageText}`}
                    <br />
                    <sub>{date}</sub>
                  </>
                }
              />
            </ListItem>
          </Link>
        )
      })}
    </List>
  )
}
