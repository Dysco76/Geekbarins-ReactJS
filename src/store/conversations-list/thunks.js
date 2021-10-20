import { ref, get, child, set } from "firebase/database"
import { db } from "../../api/firebase"
import {
  addMessageRoom,
  deleteMessageRoom,
  getMessagesFB,
} from "../message-list"
import {
  addNewChat,
  deleteChat,
  setLastMessage,
  getConversationsStart,
  getConversationsSuccess,
  getConversationsError,
} from "./"

export const addNewChatThunk = (chatName, chatId) => (dispatch) => {
  //will send request to the server

  dispatch(addNewChat(chatName, chatId))
  dispatch(addMessageRoom(chatId))
}
export const deleteChatThunk = (chatId) => (dispatch) => {
  //will send request to the server

  dispatch(deleteMessageRoom(chatId))
  dispatch(deleteChat(chatId))
}

export const setLastMessageFB = (message, chatId) => async (dispatch) => {
  try {
    const conversationRef = ref(db, `conversations/${chatId}`)
    set(child(conversationRef, "lastMessage"), message)

    dispatch(setLastMessage(message, chatId))
  } catch (err) {
    console.log(err)
  }
}

export const getConversationFB = () => async (dispatch) => {
  dispatch(getConversationsStart())
  try {
    const conversationsRef = ref(db, "conversations")
    const snapshot = await get(conversationsRef)

    const conversations = []

    snapshot.forEach((snap) => {
      conversations.push(snap.val())
    })
    dispatch(getConversationsSuccess(conversations))
  } catch (err) {
    dispatch(getConversationsError(err.message))
  }
}

export const getConversationsAndMessagesFB = () => async (dispatch) => {
  dispatch(getMessagesFB())
  dispatch(getConversationFB())
}
