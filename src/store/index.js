import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import { authenticationReducer } from "./authentication"
import { conversationsReducer } from "./conversations-list"
import { gistsReducer } from "./gists"
import { messagesReducer } from "./message-list"
// import { logger } from "./middlewares"
import { profileReducer } from "./profile"

const persistConfig = {
  key: "root",
  storage, // use local storage
  whitelist: ["profile", "authentication"], // only profile state will be persisted
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    profile: profileReducer,
    messageList: messagesReducer,
    conversations: conversationsReducer,
    gists: gistsReducer,
    authentication: authenticationReducer,
  }),
)

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (args) => args,
  ),
)

export const persistor = persistStore(store)
