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

export const addNewChatThunk = (newChat) => async (dispatch, _, {conversationsListApi}) => {

  try {
    await conversationsListApi.addNewChat(newChat)

    dispatch(addMessageRoomFB(newChat.id))
  } catch (err) {
    console.error(err)
  }
}
export const deleteChatThunk = (chatId) => async (dispatch, _, {conversationsListApi}) => {
  try {
    await conversationsListApi.deleteChat(chatId)
    dispatch(removeMessageRoomFB(chatId))
  } catch (err) {
    console.error(err)
  }
}

export const setLastMessageFB = (message, chatId) => async (dispatch, _, {conversationsListApi}) => {
  try {
    await conversationsListApi.setLastMessage(message, chatId)

    dispatch(setLastMessage(message, chatId))
  } catch (err) {
    console.error(err)
  }
}

export const subscribeToLastMessageFB = (chatId) => (dispatch, _, {conversationsListApi}) => {
  const onChildChangedCb = (snapshot) => {
    if (snapshot.key === "lastMessage") {
      dispatch(setLastMessage(snapshot.val(), chatId))
    }
  }
  const unsubscribe = conversationsListApi.subscribeToLastMessage(chatId, onChildChangedCb)

  return unsubscribe
}

export const subscribeToChatsFB = () => (dispatch, _, {conversationsListApi}) => {
  dispatch(getConversationsStart())

  const callbacks = {
    onChildAddedCb: (snapshot) => {
      dispatch(addNewChat(snapshot.val()))
    },
    onChildRemovedCb: (snapshot) => {
      dispatch(deleteChat(snapshot.val().id))
    }
  }

  try {
    const {unsubscribeAdded, unsubscribeRemoved} = conversationsListApi.subscribeToChats(callbacks)
    dispatch(getMessagesSuccess())
    return () => {
      unsubscribeAdded()
      unsubscribeRemoved()
    }
  } catch (err) {
    dispatch(getConversationsError(err.message))
  }
}

export const subscribeToConversationsAndMessagesFB = () => async (dispatch) => {
  dispatch(subscribeToMessageRoomsFB())
  dispatch(subscribeToChatsFB())
}
