import { Button, Modal, Backdrop, Fade, makeStyles } from "@material-ui/core"
import { useState } from "react"
import { AddChatForm } from "./add-chat-form"

const useStyles = makeStyles({
  modalButton: {},
})

export const AddChatModal = () => {
  const classes = useStyles()

  const [openModal, setOpenModal] = useState(false)
  const handleModalOpen = () => {
    setOpenModal(true)
  }

  const handleModalClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button
        variant="outlined"
        fullWidth={true}
        size="large"
        className={classes.modalButton}
        onClick={handleModalOpen}
      >
        Add New Room
      </Button>

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
