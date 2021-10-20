import { makeStyles } from "@material-ui/core"

export const SystemMessage = ({ message, error = false }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <p className={`${classes.text} ${error ? classes.error : null}`}>
        {message}
      </p>
    </div>
  )
}

const useStyles = makeStyles({
  container: {
    padding: "5px 15px",
    backgroundColor: "rgba(237, 237, 237, 0.3)",
    borderRadius: "15px",
  },

  text: {
    margin: "0",
    fontSize: "28px",
    color: "rgb(237, 237, 237)",
  },

  error: {
    fontWeight: "bold",
    color: "red",
  },
})
