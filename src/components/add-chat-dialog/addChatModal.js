import { Modal, Backdrop, Fade, makeStyles, Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { useState } from "react"
import { AddChatForm } from "./add-chat-form"

export const AddChatModal = () => {
  const classes = useStyles()
  console.log(classes)

  const [openModal, setOpenModal] = useState(false)
  const handleModalOpen = () => {
    setOpenModal(true)
  }

  const handleModalClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Fab
        aria-label="add new room"
        onClick={handleModalOpen}
        classes={{ root: classes.modalButton }}
      >
        <AddIcon fontSize="large" />
      </Fab>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div>
            <AddChatForm handleModalClose={handleModalClose} />
          </div>
        </Fade>
      </Modal>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  modalButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: "65px",
    height: "65px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))
