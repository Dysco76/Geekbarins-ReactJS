import { Avatar, makeStyles } from "@material-ui/core"

export const ChatAvatar = ({chat, border = false}) => {
    const classes = useStyles();
    return <Avatar style={{backgroundImage: `linear-gradient(${chat.avatar.colorTop}, ${chat.avatar.colorBottom})`}} 
            className={border ? classes.border : null}>
    {chat.title[0]}
  </Avatar>
}

const useStyles = makeStyles(theme => ({
    border: {
        border: `1px solid ${theme.palette.grey['700']}`
    }
}))