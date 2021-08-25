import { createStore, combineReducers } from "redux"
import { conversationsReducer } from "./conversations-list"
import { messagesReducer } from "./message-list"
import { profileReducer } from "./profile"

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    messageList: messagesReducer,
    conversations: conversationsReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
