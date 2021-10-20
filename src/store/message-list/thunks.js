import { ref, get, set, child } from "firebase/database"
import { db } from "../../api/firebase"
import { clearMessageInput, setLastMessageFB } from "../conversations-list"
import {
  addMessage,
  deleteMessage,
  editMessage,
  getMessagesStart,
  getMessagesSuccess,
  getMessagesError,
} from "./"
const getLastMessage = (state, roomId) => {
  const room = state.messageList.rooms[roomId] || []
  return room[room.length - 1]
}

export const sendMessageThunk = (message, roomId) => async (dispatch) => {
  const messageRoomRef = ref(db, `messages/${roomId}`)

  try {
    await set(child(messageRoomRef, message.id), message)

    dispatch(addMessage(message, roomId))
    dispatch(setLastMessageFB(message, roomId))
    dispatch(clearMessageInput(roomId))
  } catch (err) {
    console.error(err)
  }
}

export const removeMessageThunk =
  (messageId, roomId) => async (dispatch, getState) => {
    const messageRoomRef = ref(db, `messages/${roomId}`)

    try {
      await set(child(messageRoomRef, messageId), null)

      dispatch(deleteMessage(messageId, roomId))
      const newLastMessage = getLastMessage(getState(), roomId)
      dispatch(setLastMessageFB(newLastMessage, roomId))
    } catch (err) {
      console.log(err)
    }
  }
export const editMessageThunk = (message, roomId) => (dispatch) => {
  const messageRef = ref(db, `messages/${roomId}/${message.id}`)
  set(child(messageRef, "/message"), message.message)

  dispatch(editMessage(message, roomId))
  dispatch(clearMessageInput(roomId))
}

export const getMessagesFB = () => async (dispatch) => {
  dispatch(getMessagesStart())
  try {
    const messagesRef = ref(db, "messages")
    const snapshot = await get(messagesRef)

    const messages = {}
    snapshot.forEach((snap) => {
      messages[snap.key] = Object.values(snap.val())
    })

    dispatch(getMessagesSuccess(messages))
  } catch (err) {
    dispatch(getMessagesError(err.message))
  }
}
