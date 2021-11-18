import {
  ref,
  // get,
  set,
  child,
  update,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database"
import { db } from "../../api/firebase"
import {
  clearMessageInput,
  setLastMessageFB,
  setMessageId,
} from "../conversations-list"
import {
  addMessage,
  deleteMessage,
  editMessage,
  getMessagesStart,
  getMessagesSuccess,
  getMessagesError,
  receiveMessage,
  receiveMessageUpdate,
  addMessageRoom,
} from "./"
import { deleteMessageRoom } from "./actions"
export const getLastMessage = (state, roomId) => {
  const room = state.messageList.rooms[roomId] || []
  return room[room.length - 1]
}

export const sendMessageThunk = (message, roomId) => async (dispatch) => {
  const messageRoomRef = ref(db, `messages/${roomId}`)

  try {
    await set(child(messageRoomRef, message.id), message)

    dispatch(addMessage(message, roomId))
    dispatch(setLastMessageFB(message, roomId))
    // dispatch(clearMessageInput(roomId))
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
      console.error(err)
    }
  }
export const editMessageThunk =
  (message, roomId) => async (dispatch, getState) => {
    const state = getState()
    const existingMessage = state.messageList.rooms[roomId].find(
      (item) => item.id === message.id,
    )

    const messageRef = ref(db, `messages/${roomId}/${message.id}`)

    try {
      await set(child(messageRef, "/message"), message.message)
      if (existingMessage.id === getLastMessage(state, roomId).id)
        dispatch(
          setLastMessageFB(
            { ...existingMessage, message: message.message },
            roomId,
          ),
        )

      dispatch(editMessage(message, roomId))
      dispatch(clearMessageInput(roomId))
      dispatch(setMessageId("", roomId))
    } catch (err) {
      console.error(err)
    }
  }

export const addMessageRoomFB = (id) => async (dispatch) => {
  const firstMessage = {
    author: "",
    date: "",
    id: "shadowMessage",
    message: "",
  }
  const messageRoomsRef = ref(db, `messages/`)

  try {
    await set(child(messageRoomsRef, id), { 0: firstMessage })
    // dispatch(addMessageRoom(id))
  } catch (err) {
    console.error(err)
  }
}

export const removeMessageRoomFB = (chatId) => async (dispatch) => {
  const messageRoomsRef = ref(db, `messages/`)
  try {
    await set(child(messageRoomsRef, chatId), null)
  } catch (err) {
    console.error(err)
  }
}

export const subscribeToMessageRoomsFB = () => (dispatch, getState) => {
  dispatch(getMessagesStart())
  let addedMessageRooms = 0
  const messageRoomsRef = ref(db, `messages/`)

  try {
    const unsubscribe = onChildAdded(messageRoomsRef, (snapshot) => {
      dispatch(addMessageRoom(snapshot.key, Object.values(snapshot.val())))
      addedMessageRooms += 1
      if (addedMessageRooms === getState().conversations.conversations.length)
        dispatch(getMessagesSuccess())
    })

    onChildRemoved(messageRoomsRef, (snapshot) => {
      dispatch(deleteMessageRoom(snapshot.val()))
    })
    return () => {
      unsubscribe()
    }
  } catch (err) {
    dispatch(getMessagesError(err.message))
  }
}

// export const getMessagesFB = () => async (dispatch) => {
//   dispatch(getMessagesStart())
//   try {
//     const messagesRef = ref(db, "messages")
//     const snapshot = await get(messagesRef)

//     const messages = {}
//     snapshot.forEach((snap) => {
//       messages[snap.key] = Object.values(snap.val())
//     })

//     dispatch(getMessagesSuccess(messages))
//   } catch (err) {
//     dispatch(getMessagesError(err.message))
//   }
// }

export const subscribeToMessagesFB = (roomId) => (dispatch) => {
  const messageRoomRef = ref(db, `messages/${roomId}`)
  const unsubscribeAdded = onChildAdded(messageRoomRef, (snapshot) => {
    dispatch(receiveMessage(snapshot.val(), roomId))
  })
  const unsubscribeChanged = onChildChanged(messageRoomRef, (snapshot) => {
    dispatch(receiveMessageUpdate(snapshot.val(), roomId))
  })

  const unsubscribeRemoved = onChildRemoved(messageRoomRef, (snapshot) => {
    dispatch(deleteMessage(snapshot.val().id, roomId))
  })

  return () => {
    unsubscribeAdded()
    unsubscribeChanged()
    unsubscribeRemoved()
  }
}

export const updateMessagesAuthorNameFB =
  (uid, name) => async (dispatch, getState) => {
    const state = getState()
    const rooms = state.messageList.rooms
    const updates = {}

    Object.keys(rooms).forEach((roomId) => {
      const lastMessage = getLastMessage(state, roomId)
      if (uid === lastMessage.authorId)
        dispatch(setLastMessageFB({ ...lastMessage, author: name }, roomId))
      rooms[roomId].forEach((message) => {
        if (message.authorId === uid) {
          updates[`/messages/${roomId}/${message.id}/author`] = name
        }
      })
    })
    try {
      await update(ref(db), updates)
    } catch (err) {
      console.error(err)
    }
  }
