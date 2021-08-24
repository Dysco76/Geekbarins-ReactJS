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
)
