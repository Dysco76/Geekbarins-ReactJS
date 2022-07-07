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
    <Paper className={classes.root} square={true}>
      <Typography variant="h5" gutterBottom={true} className={classes.heading}>
        Edit Profile
      </Typography>
      <div className={classes.editProfileInputs}>
        <TextField
          label="Name"
          id="name"
          onChange={handleInputChange}
          value={userInfo.name}
        />
        <TextField
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
      <div className={classes.buttonsWrapper}>
      <Button className={classes.formButton} onClick={handleProfileSave}>
        Save
      </Button>
      <Button className={classes.formButton} onClick={handleEditClose}>
        Discard
      </Button>
      </div>
    </Paper>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
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
  heading: {
    alignSelf: "flex-start"
  }, 
  editProfileInputs: {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  margin: "20px 0",
  width: "100%",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  profileInput: {
    width: "100%",
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    gap: "10px",
  },
  formButton: {
    color: theme.palette.primary.light
  }
}))
