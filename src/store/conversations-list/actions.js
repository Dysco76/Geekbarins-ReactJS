import { HANDLE_CHANGE_MESSAGE_VALUE, CLEAR_MESSAGE_INPUT } from "./types"

export const handleChangeMessageValue = (value, roomId) => ({
  type: HANDLE_CHANGE_MESSAGE_VALUE,
  payload: { value, roomId },
})
export const clearMessageInput = (roomId) => ({
  type: CLEAR_MESSAGE_INPUT,
  payload: { roomId },
})
