import {
  Paper,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Modal,
  Backdrop,
  Fade,
  makeStyles,
  Popover,
} from "@material-ui/core"
import { Close, AccountCircle, Edit } from "@material-ui/icons"
import React, { useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { EditProfileForm, Logout } from "../"
import { getUserInfo } from "../../store/profile"

export const ProfileDialog = () => {
  const classes = useStyles()

  const { name, phone, id, roomsCreated } = useSelector(getUserInfo)

  const [openProfile, setOpenProfile] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleProfileOpen = (event) => {
    setOpenProfile(true)
    setAnchorEl(event.target)
  }

  const handleProfileClose = () => {
    setOpenProfile(false)
  }

  const handleEditOpen = () => {
    setOpenEdit(true)
  }

  const handleEditClose = useCallback(() => {
    setOpenEdit(false)
  }, [setOpenEdit])

  return (
    <>
      <IconButton
        // color="primary"
        onClick={handleProfileOpen}
      >
        <AccountCircle fontSize="large"/>
      </IconButton>
      <Popover
        open={openProfile}
        onClose={handleProfileClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
          <IconButton
            data-action="close-profile"
            onClick={handleProfileClose}
            className={classes.closeButton}
          >
            <Close />
          </IconButton>
          <Paper className={classes.infoWrapper} elevation={0}>
            <Avatar className={classes.avatar}>
              <AccountCircle className={classes.avatarIcon} />
            </Avatar>
            <List className={classes.profileList}>
              <ListItem className={classes.profileLi}>
                <ListItemText primaryTypographyProps={{variant: "body2"}} style={{margin: "0"}}>
                  {name}
                </ListItemText>
              </ListItem>
              <ListItem className={classes.profileLi}>
                <ListItemText primaryTypographyProps={{variant: "body2"}} style={{margin: "0"}}>
                  {phone || '123 456 789'}
                </ListItemText>
              </ListItem>
            </List>
            <Button onClick={handleEditOpen} fullWidth={true} startIcon={<Edit />}>
              Edit Profile
            </Button>
          <Logout style={{width: "100%"}} />
          </Paper>
      </Popover>

      <Modal
        open={openEdit}
        onClose={handleEditClose}
        closeAfterTransition={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEdit}>
          <>
            <EditProfileForm
              handleEditClose={handleEditClose}
              info={{ name, phone, id, roomsCreated }}
            />
          </>
        </Fade>
      </Modal>
    </>
  )
}

const useStyles = makeStyles({
  // root: {
  //   display: "flex",
  //   justifyContent: "center",
  //   width: "auto"
  // },
  closeButton: {
    position: "absolute",
    right: "5px",
    top: "5px",
  },
  infoWrapper: {
    width: "350px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  },
  avatar: {
    width: "70px",
    height: "70px",
  },
  avatarIcon: {
    width: "100%",
    height: "100%",
  },
  profileList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px 0",
    marginBottom: "20px"
  },
  profileLi: {
    wordWrap: "break-word",
    textAlign: "center",
    padding: "0"
  },
})
