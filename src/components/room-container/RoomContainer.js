import { makeStyles } from "@material-ui/core"

export const RoomContainer = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.container}>{children}</div>
}

const useStyles = makeStyles({
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgb(92,207,104)",
    backgroundImage:
      "linear-gradient(25deg, rgba(92,207,104,1) 11%, rgba(0,212,255,1) 96%)",
  },
})
