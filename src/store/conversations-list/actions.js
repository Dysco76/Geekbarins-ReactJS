import { HANDLE_CHANGE_MESSAGE_VALUE } from "./types"

export const handleChangeMessageValue = (value, roomId) => ({
  type: HANDLE_CHANGE_MESSAGE_VALUE,
  payload: { value, roomId },
})
