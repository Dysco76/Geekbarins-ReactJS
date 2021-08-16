import {
  Drawer,
  Paper,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core"
import { Close } from "@material-ui/icons"
import React, { useState } from "react"

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
    width: "100%",
  },
  paper: {
    position: "absolute",
    width: "100%",
    backgroundColor: "blue",
    height: "100vh",
  },
})

export const ProfileDialog = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.wrapper}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
          <IconButton data-action="close-profile" onClick={handleClose}>
            <Close />
          </IconButton>
          Profile
        </Paper>
      </Drawer>
    </div>
  )
}
