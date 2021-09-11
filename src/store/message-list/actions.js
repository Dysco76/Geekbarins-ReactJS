import { ADD_MESSAGE, DELETE_MESSAGE, EDIT_MESSAGE } from "./types"

export const addMessage = (message, roomId) => ({
  type: ADD_MESSAGE,
  payload: { message, roomId },
})

export const deleteMessage = (messageId, roomId) => ({
  type: DELETE_MESSAGE,
  payload: { messageId, roomId },
})

export const editMessage = (message, roomId) => ({
  type: EDIT_MESSAGE,
  payload: { message, roomId },
})
