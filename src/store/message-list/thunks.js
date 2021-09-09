import { clearMessageInput } from "../conversations-list"
import { addMessage, deleteMessage } from "./"

export const sendMessageThunk = (message, roomId) => (dispatch, getState) => {
  //will send request to server

  dispatch(addMessage(message, roomId))
  dispatch(clearMessageInput(roomId))

  if (message.author === getState().profile.user.name) {
    setTimeout(
      () =>
        dispatch(
          addMessage({ author: "bot", message: "Hello from bot!" }, roomId),
        ),
      500,
    )
  }
}

export const removeMessageThunk = (messageId, roomId) => (dispatch) => {
  //will send request to server

  dispatch(deleteMessage(messageId, roomId))
}
