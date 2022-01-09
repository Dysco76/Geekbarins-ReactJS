import { AppBar, makeStyles, Toolbar, Tooltip, Typography, Grid } from "@material-ui/core"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { ChatAvatar, ProfileDialog, SearchBar } from ".."
import { getConversationById } from "../../store/conversations-list"

export const Header = () => {
  const classes = useStyles()
  const {roomId} = useParams();
  const room = useSelector(getConversationById(roomId))

  return (
    <AppBar position="static" className={classes.root} >
      <Toolbar className={classes.toolbar}>
        <Grid container={true} alignItems="center" className={classes.grid}>
          <Grid item={true} xs={5} sm={4} md={3}>
            <div className={classes.search}>
              <SearchBar />
            </div>
          </Grid>
          <Grid item={true} xs={5} sm={6} md={7}>
            {room && 
            <Tooltip title={room.title}>
              <div className={classes.roomHeadingWrapper}>
              <ChatAvatar chat={room} border={true} />
              <Typography className={classes.roomHeading} variant="h5" component="h2">{room.title}</Typography>
              </div>
            </Tooltip>
            }
          </Grid>
          <Grid item={true} xs={2}>
            <div className={classes.profile}>
              <ProfileDialog/>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.grey["1000"]}`
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    
  },
  grid: {
    height: theme.mixins.toolbar.minHeight + "px"
  },
  search: {
    paddingRight: "15px",
    marginRight: "20px"
  },
  profile: {
    marginLeft: "auto",
    display: "flex",
    justifyContent: "flex-end"
  },
  roomHeadingWrapper: {
    margin: "0 auto",
    display: "flex",
  },
  roomHeading: {
    marginLeft: "10px"
  }
}))
