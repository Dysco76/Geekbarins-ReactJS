import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  ADD_MESSAGE_ROOM,
  DELETE_MESSAGE_ROOM,
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGE_UPDATE,
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
export const addMessageRoom = (roomId) => ({
  type: ADD_MESSAGE_ROOM,
  payload: { newRoomId: roomId },
})
export const deleteMessageRoom = (roomId) => ({
  type: DELETE_MESSAGE_ROOM,
  payload: { id: roomId },
})
export const getMessagesStart = () => ({
  type: GET_MESSAGES_START,
})
export const getMessagesSuccess = (messages) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: messages,
})
export const getMessagesError = (error) => ({
  type: GET_MESSAGES_ERROR,
  payload: error,
})
export const receiveMessage = (message, roomId) => ({
  type: RECEIVE_MESSAGE,
  payload: { message, roomId },
})
export const receiveMessageUpdate = (message, roomId) => ({
  type: RECEIVE_MESSAGE_UPDATE,
  payload: { message, roomId },
})
