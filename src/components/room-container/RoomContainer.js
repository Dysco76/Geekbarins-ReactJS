import { makeStyles } from "@material-ui/core"

export const RoomContainer = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.container}>{children}</div>
}

const useStyles = makeStyles({})
