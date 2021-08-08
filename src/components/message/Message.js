import { Paper, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  message: {
    margin: "10px 0",
    marginRight: "5%",
    alignSelf: "flex-end",
    backgroundColor: "#e0f2f1",
    maxWidth: "500px",
    textAlign: "left",
    borderRadius: "5px",
    padding: "10px",
    overflowWrap: "break-word",
  },

  messageIncoming: {
    marginLeft: "5%",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },

  messageContent: {
    margin: 0,
    fontSize: "20px",
  },

  author: {
    color: "#4caf50",
    margin: 0,
  },
})

export function Message({ message: { value, author } }) {
  const classes = useStyles()
  return (
    <Paper
      className={`${classes.message} ${
        author === "bot" ? classes.messageIncoming : ""
      }`}
      elevation={3}
    >
      <p className={classes.messageContent}>
        <p className={classes.author}>{author}:</p> {value}
      </p>
    </Paper>
  )
}
