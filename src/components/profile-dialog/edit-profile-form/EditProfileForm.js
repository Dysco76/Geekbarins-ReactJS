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

export const EditProfileForm = ({ handleEditClose, info }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState({
    name: info.name,
    phone: info.phone,
  })
  const [errors, setErrors] = useState([])

  const validateUsername = () => {
    const errorMessage = []
    if (
      userInfo.name.trim().length > 25 ||
      userInfo.phone.replace(/s/g, "").length > 25
    ) {
      errorMessage.push(
        "Profile name and phone cannot be longer than 25 characters",
      )
    }

    if (userInfo.phone.match(/\D/))
      errorMessage.push(
        'Please enter phone number using only integers, i.e "12345678"',
      )

    if (!userInfo.name.trim()) errorMessage.push("Profile name cannot be empty")

    if (errorMessage.length > 0) {
      setErrors(errorMessage)
      return false
    }

    return true
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setUserInfo((prev) => ({ ...prev, [id]: value }))
  }

  const handleProfileSave = () => {
    if (!validateUsername()) return
    dispatch(
      updateProfileFB({
        phone: userInfo.phone.replace(/s/g, ""),
        name: userInfo.name.trim(),
        id: info.id,
        roomsCreated: info.roomsCreated,
      }),
    )
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
        {errors.map((error) => (
          <span className={classes.errorText} key={error}>
            {error}
          </span>
        ))}
      </div>
      <Button variant="outlined" onClick={handleProfileSave}>
        Save
      </Button>
    </Paper>
  )
}

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
    width: "565px",
  },

  editProfileInputs: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
    width: "100%",
  },

  errorText: {
    color: "red",
    textAlign: "center",
  },

  profileInput: {
    width: "100%",
  },
})
