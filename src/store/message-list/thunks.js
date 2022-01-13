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

export const sendMessageThunk = (message, roomId) => async (dispatch, _, {messageListApi}) => {

  try {
    await messageListApi.sendMessage(message, roomId)

    dispatch(addMessage(message, roomId))
    dispatch(setLastMessageFB(message, roomId))
  } catch (err) {
    console.error(err)
  }
}

export const removeMessageThunk =
  (messageId, roomId) => async (dispatch, getState, {messageListApi}) => {

    try {
      await messageListApi.removeMessage(messageId, roomId)

      dispatch(deleteMessage(messageId, roomId))
      const newLastMessage = getLastMessage(getState(), roomId)
      dispatch(setLastMessageFB(newLastMessage, roomId))
    } catch (err) {
      console.error(err)
    }
  }

export const editMessageThunk =
  (message, roomId) => async (dispatch, getState, {messageListApi}) => {
    const state = getState()
    const existingMessage = state.messageList.rooms[roomId].find(
      (item) => item.id === message.id,
    )

    try {
      await messageListApi.editMessage(message, roomId)
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

export const addMessageRoomFB = (id) => async (dispatch, _, {messageListApi}) => {
  const firstMessage = {
    author: "",
    date: "",
    id: "shadowMessage",
    message: "",
  }

  try {
    await messageListApi.addMessageRoom(id, firstMessage)
  } catch (err) {
    console.error(err)
  }
}

export const removeMessageRoomFB = (id) => async (dispatch, _, {messageListApi}) => {
  try {
    await messageListApi.removeMessageRoom(id)
  } catch (err) {
    console.error(err)
  }
}

export const subscribeToMessageRoomsFB = () => async(dispatch, getState, {messageListApi}) => {
  dispatch(getMessagesStart())
  let addedMessageRooms = 0

  const onChildAddedCb = (snapshot) => {
    dispatch(addMessageRoom(snapshot.key, Object.values(snapshot.val())))
      addedMessageRooms += 1
      if (addedMessageRooms === getState().conversations.conversations.length)
        dispatch(getMessagesSuccess())
  }

  const onChildRemovedCb = (snapshot) => {
    dispatch(deleteMessageRoom(snapshot.val()))
  }

  try {
    const unsubscribe = await messageListApi.subscribeToMessageRooms(onChildAddedCb, onChildRemovedCb)
    return () => {
      unsubscribe()
    }
  } catch (err) {
    dispatch(getMessagesError(err.message))
  }
}


export const subscribeToMessagesFB = (roomId) => async(dispatch, _, {messageListApi}) => {
  const callbacks = {
    onChildAddedCb: (snapshot) => {
      dispatch(receiveMessage(snapshot.val(), roomId))
    },
    onChildChangedCb: (snapshot) => {
      dispatch(receiveMessageUpdate(snapshot.val(), roomId))
    },
    onChildRemovedCb: (snapshot) => {
      dispatch(deleteMessage(snapshot.val().id, roomId))
    }
  }

  const {unsubscribeAdded, unsubscribeChanged, unsubscribeRemoved} = messageListApi.subscribeToMessages(roomId, callbacks)
  

  return () => {
    unsubscribeAdded()
    unsubscribeChanged()
    unsubscribeRemoved()
  }
}

export const updateMessagesAuthorNameFB =
  (uid, name) => async (dispatch, getState, {messageListApi}) => {
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
      await messageListApi.updateMessagesAuthor(updates)
    } catch (err) {
      console.error(err)
    }
  }
