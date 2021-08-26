import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { conversationsReducer } from "./conversations-list"
import { messagesReducer } from "./message-list"
import { logger } from "./middlewares"
import { profileReducer } from "./profile"

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    messageList: messagesReducer,
    conversations: conversationsReducer,
  }),
  compose(
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
)
