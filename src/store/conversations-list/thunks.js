import {
  ref,
  // get,
  child,
  set,
  onChildChanged,
  onChildAdded,
  onChildRemoved,
} from "firebase/database"
import { db } from "../../api/firebase"
import {
  addMessageRoomFB,
  getMessagesSuccess,
  removeMessageRoomFB,
  subscribeToMessageRoomsFB,
} from "../message-list"
import {
  addNewChat,
  deleteChat,
  setLastMessage,
  getConversationsStart,
  getConversationsError,
} from "./"

export const addNewChatThunk = (newChat) => async (dispatch, getState) => {
  const conversationRef = ref(db, `conversations/`)

  try {
    await set(child(conversationRef, newChat.id), newChat)

    dispatch(addMessageRoomFB(newChat.id))
  } catch (err) {
    console.error(err)
  }
}
export const deleteChatThunk = (chatId) => async (dispatch) => {
  const conversationRef = ref(db, `conversations/`)
  try {
    await set(child(conversationRef, chatId), null)
    dispatch(removeMessageRoomFB(chatId))
  } catch (err) {
    console.error(err)
  }
}

export const setLastMessageFB = (message, chatId) => async (dispatch) => {
  try {
    const conversationRef = ref(db, `conversations/${chatId}`)
    set(child(conversationRef, "lastMessage"), message)

    dispatch(setLastMessage(message, chatId))
  } catch (err) {
    console.error(err)
  }
}

export const subscribeToLastMessageFB = (chatId) => (dispatch) => {
  const conversationsRef = ref(db, `conversations/${chatId}`)
  const unsubscribe = onChildChanged(conversationsRef, (snapshot) => {
    if (snapshot.key === "lastMessage") {
      dispatch(setLastMessage(snapshot.val(), chatId))
    }
  })

  return unsubscribe
}

export const subscribeToChatsFB = () => (dispatch) => {
  dispatch(getConversationsStart())
  const conversationsRef = ref(db, `conversations/`)

  try {
    const unsubscribeAdded = onChildAdded(conversationsRef, (snapshot) => {
      dispatch(addNewChat(snapshot.val()))
    })
    const unsubscribeRemoved = onChildRemoved(conversationsRef, (snapshot) => {
      dispatch(deleteChat(snapshot.val().id))
    })
    dispatch(getMessagesSuccess())
    return () => {
      unsubscribeAdded()
      unsubscribeRemoved()
    }
  } catch (err) {
    dispatch(getConversationsError(err.message))
  }
}

// export const getConversationFB = () => async (dispatch) => {
//   dispatch(getConversationsStart())
//   try {
//     const conversationsRef = ref(db, "conversations")
//     const snapshot = await get(conversationsRef)

//     const conversations = []

//     snapshot.forEach((snap) => {
//       conversations.push(snap.val())
//     })
//     dispatch(getConversationsSuccess(conversations))
//   } catch (err) {
//     dispatch(getConversationsError(err.message))
//   }
// }

export const subscribeToConversationsAndMessagesFB = () => async (dispatch) => {
  dispatch(subscribeToMessageRoomsFB())
  dispatch(subscribeToChatsFB())
}
