import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  ADD_MESSAGE_ROOM,
  DELETE_MESSAGE_ROOM,
} from "./types"

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
export const addMessageRoom = (chatId) => ({
  type: ADD_MESSAGE_ROOM,
  payload: { newRoomId: chatId },
})
export const deleteMessageRoom = (chatId) => ({
  type: DELETE_MESSAGE_ROOM,
  payload: { id: chatId },
})
