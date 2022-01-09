import { Grid, makeStyles } from "@material-ui/core"
import { Route, Switch } from "react-router"
import { SystemMessage } from ".."

export const Layout = ({ sidebar, header, main }) => {
  const classes = useStyles()
  return (
    <div className={classes.layout}>
      <Switch>
        <Route path={["/chat/:roomId", "/chat"]}>
          <Grid container={true} className={classes.content}>
            <Grid item={true} xs={12}>{header}</Grid>
            <Grid item={true} sm={12} md={3} className={classes.side}>
              {sidebar}
            </Grid>
            <Grid
              item={true}
              sm={12}
              md={9}
              component="main"
              className={classes.main}
            >
              <Route exact={true} path="/chat">
                <SystemMessage message="Please select a room from the list" />
              </Route>
              <Route path="/chat/:roomId">{main}</Route>
              <Route exact={true} path="/chat/room-not-found">
                <SystemMessage message="This room does not exist :c" />
              </Route>
            </Grid>
          </Grid>
        </Route>
      </Switch>
    </div>
  )
}

const useStyles = makeStyles((theme) => {
  return {
    layout: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.grey["900"]
    },
    content: {
      maxWidth: "1680px",
      margin: "0 auto",
      height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    },
    side: {
      height: "100%",
      width: "420px",
    },
    main: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
  }
})
