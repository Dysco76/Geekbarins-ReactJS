import { AppBar, makeStyles, Toolbar } from "@material-ui/core"

export const Header = () => {
  const classes = useStyles()
  return (
    <AppBar position="static" className={classes.root} elevation="0">
      <Toolbar />
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey["900"],
  },
}))
