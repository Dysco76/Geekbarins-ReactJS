import {
  Paper,
  Button,
  Typography,
  TextField,
  makeStyles,
} from "@material-ui/core"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateProfileInfo } from "../../store/profile"

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

export const EditProfileForm = ({ handleEditClose }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [userInfo, setUserInfo] = useState({ name: "User", phone: "", age: "" })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setUserInfo((info) => ({ ...info, [id]: value }))
  }

  const handleProfileSave = () => {
    dispatch(updateProfileInfo(userInfo))
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
        />
        <TextField
          variant="outlined"
          label="Phone"
          id="phone"
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          label="Age"
          id="age"
          onChange={handleInputChange}
        />
      </div>
      <Button variant="outlined" onClick={handleProfileSave}>
        Save
      </Button>
    </Paper>
  )
}
