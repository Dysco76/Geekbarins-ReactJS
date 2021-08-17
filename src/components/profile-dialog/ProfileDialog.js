import {
  Drawer,
  Paper,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  makeStyles,
} from "@material-ui/core"
import { Close, AccountCircle } from "@material-ui/icons"
import React, { useState } from "react"
import { useSelector } from "react-redux"
// import { updateProfileInfo } from "../../store/profile"

const useStyles = makeStyles({
  paper: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  openButton: {
    marginLeft: "20px",
  },

  closeButton: {
    position: "absolute",
    right: "5px",
    top: "5px",
  },

  infoWrapper: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    width: "70px",
    height: "70px",
  },

  avatarIcon: {
    width: "100%",
    height: "100%",
  },
})

export const ProfileDialog = () => {
  const classes = useStyles()

  const { age, name, phone } = useSelector((state) => state.user)

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.wrapper}>
      <Button
        color="primary"
        startIcon={<AccountCircle />}
        className={classes.openButton}
        onClick={handleClickOpen}
      >
        Profile
      </Button>
      <Drawer
        open={open}
        anchor="left"
        variant="persistent"
        classes={{
          docked: classes.docked,
          paper: classes.paper,
        }}
      >
        <Paper className={classes.paper}>
          <IconButton
            data-action="close-profile"
            onClick={handleClose}
            className={classes.closeButton}
          >
            <Close />
          </IconButton>
          <Paper className={classes.infoWrapper} elevation={0}>
            <Avatar className={classes.avatar}>
              <AccountCircle className={classes.avatarIcon} />
            </Avatar>
            <List>
              <ListItem>
                <ListItemText>Name: {name}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Phone: {phone}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Age: {age}</ListItemText>
              </ListItem>
            </List>
            <Button variant="outlined">Edit Profile</Button>
          </Paper>
        </Paper>
      </Drawer>
    </div>
  )
}
