import { addMessageRoom, deleteMessageRoom } from "../message-list"
import { addNewChat, deleteChat } from "./"

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
