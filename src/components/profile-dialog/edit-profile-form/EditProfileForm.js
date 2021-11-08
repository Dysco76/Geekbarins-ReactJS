import {
  Paper,
  Button,
  Typography,
  TextField,
  makeStyles,
} from "@material-ui/core"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateProfileFB } from "../../../store/profile"

const useStyles = makeStyles({
  editProfileWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  editProfileInputs: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
})

export const EditProfileForm = ({ handleEditClose, info }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState({
    name: info.name,
    phone: info.phone,
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setUserInfo((info) => ({ ...info, [id]: value }))
  }

  const handleProfileSave = () => {
    dispatch(updateProfileFB({ ...userInfo, id: info.id }))
    handleEditClose()
  }

  return (
    <Paper className={classes.editProfileWrapper}>
      <Typography variant="h4" gutterBottom={true}>
        Edit Profile
      </Typography>
      <div className={classes.editProfileInputs}>
        <TextField
          variant="outlined"
          label="Name"
          id="name"
          onChange={handleInputChange}
          value={userInfo.name}
        />
        <TextField
          variant="outlined"
          label="Phone"
          id="phone"
          onChange={handleInputChange}
          value={userInfo.phone}
        />
      </div>
      <Button variant="outlined" onClick={handleProfileSave}>
        Save
      </Button>
    </Paper>
  )
}
