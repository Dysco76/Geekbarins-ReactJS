import {
  Paper,
  Button,
  Typography,
  TextField,
  makeStyles,
} from "@material-ui/core"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addNewChatThunk } from "../../../store/conversations-list"

const useStyles = makeStyles({
  addChatWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  addChatInputs: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },

  buttonsWrapper: {
    display: "flex",
    gap: "10px",
  },

  cancelButton: {
    backgroundColor: "#f44336",
    color: "#fff",
  },
})

export const AddChatForm = ({ handleModalClose }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [chatName, setChatName] = useState("New Room")

  const handleInputChange = (e) => {
    setChatName(e.target.value)
  }

  const handleAddChat = () => {
    const chatId = String(Date.now())
    dispatch(addNewChatThunk(chatName, chatId))
    handleModalClose()
  }
  return (
    <Paper className={classes.addChatWrapper}>
      <Typography variant="h4" gutterBottom={true}>
        Add New Room
      </Typography>
      <div className={classes.addChatInputs}>
        <TextField
          variant="outlined"
          id="room_name"
          label="Room name"
          onChange={handleInputChange}
          value={chatName}
          placeholder="Name your room"
        />
      </div>
      <div className={classes.buttonsWrapper}>
        <Button
          variant="contained"
          size="large"
          onClick={handleAddChat}
          color="primary"
          startIcon={<AddCircleIcon fontSize="large" />}
        >
          Add
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleModalClose}
          className={classes.cancelButton}
        >
          Cancel
        </Button>
      </div>
    </Paper>
  )
}
