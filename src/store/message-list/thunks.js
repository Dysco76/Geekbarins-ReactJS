import { clearMessageInput } from "../conversations-list"
import { addMessage } from "./"

export const sendMessageThunk = (message, roomId) => (dispatch, getState) => {
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
