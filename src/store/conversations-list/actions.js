import {
  HANDLE_CHANGE_MESSAGE_VALUE,
  CLEAR_MESSAGE_INPUT,
  SET_MESSAGE_ID,
  ADD_NEW_CHAT,
  DELETE_CHAT,
  GET_CONVERSATIONS_ERROR,
  GET_CONVERSATIONS_START,
  SET_LAST_MESSAGE,
} from "./types"

export const addNewChat = (newChat) => ({
  type: ADD_NEW_CHAT,
  payload: newChat,
})

export const deleteChat = (chatId) => ({
  type: DELETE_CHAT,
  payload: { id: chatId },
})

export const handleChangeMessageValue = (value, roomId) => ({
  type: HANDLE_CHANGE_MESSAGE_VALUE,
  payload: { value, roomId },
})

export const clearMessageInput = (roomId) => ({
  type: CLEAR_MESSAGE_INPUT,
  payload: { roomId },
})

export const setMessageId = (messageId, roomId) => ({
  type: SET_MESSAGE_ID,
  payload: { messageId, roomId },
})

export const setLastMessage = (message, chatId) => ({
  type: SET_LAST_MESSAGE,
  payload: { message, id: chatId },
})

export const getConversationsStart = () => ({
  type: GET_CONVERSATIONS_START,
})

export const getConversationsError = (error) => ({
  type: GET_CONVERSATIONS_ERROR,
  payload: error,
})
