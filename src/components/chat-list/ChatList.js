import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles,
} from "@material-ui/core"
import { Group } from "@material-ui/icons"
import { useState } from "react"

export const ChatList = () => {
  const [chatList, setChatList] = useState([
    { id: "1", name: "Work" },
    { id: "2", name: "Friends" },
    { id: "3", name: "Family" },
  ])

  return (
    <List component="nav">
      {chatList.map((chat) => {
        return (
          <ListItem key={chat.id} button={true}>
            <ListItemAvatar>
              <Avatar>
                <Group />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={chat.name} />
          </ListItem>
        )
      })}
    </List>
  )
}
