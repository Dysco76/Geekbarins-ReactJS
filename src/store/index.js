import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import * as authenticationApi from "../api/authentication"
import * as conversationsListApi from "../api/conversations-list"
import * as messageListApi from "../api/message-list"
import * as profileApi from "../api/profile"
import { authenticationReducer } from "./authentication"
import { conversationsReducer } from "./conversations-list"
import { messagesReducer } from "./message-list"
import { profileReducer } from "./profile"

const persistConfig = {
  key: "root",
  storage, // use local storage
  whitelist: ["profile", "authentication"], // only profile and auth states will be persisted
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    profile: profileReducer,
    messageList: messagesReducer,
    conversations: conversationsReducer,
    authentication: authenticationReducer,
  }),
)

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({
      messageListApi,
      conversationsListApi,
      authenticationApi,
      profileApi
    })),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (args) => args,
  ),
)

export const persistor = persistStore(store)
