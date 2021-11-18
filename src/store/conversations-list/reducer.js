import {
  HANDLE_CHANGE_MESSAGE_VALUE,
  CLEAR_MESSAGE_INPUT,
  SET_MESSAGE_ID,
  ADD_NEW_CHAT,
  DELETE_CHAT,
  GET_CONVERSATIONS_START,
  GET_CONVERSATIONS_ERROR,
  SET_LAST_MESSAGE,
} from "./types"

const initialState = {
  conversations: [],
  pending: true,
  error: false,
}

const setInputValue = (state, payload) => ({
  ...state,
  conversations: state.conversations.map((chat) =>
    chat.id === payload.roomId
      ? { ...chat, currentInput: payload?.value || "" }
      : chat,
  ),
})

export const conversationsReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case HANDLE_CHANGE_MESSAGE_VALUE: {
      return payload.value.length > 999 ? state : setInputValue(state, payload)
    }

    case CLEAR_MESSAGE_INPUT:
      return setInputValue(state, payload)

    case SET_MESSAGE_ID:
      return {
        ...state,
        conversations: state.conversations.map((chat) =>
          chat.id === payload.roomId
            ? { ...chat, messageId: payload?.messageId || null }
            : chat,
        ),
      }

    case ADD_NEW_CHAT:
      return {
        pending: false,
        error: false,
        conversations: state.conversations.find(
          (chat) => chat.id === payload.id,
        )
          ? [...state.conversations]
          : [
              ...state.conversations,
              {
                ...payload,
                messageId: null,
              },
            ],
      }

    case DELETE_CHAT:
      return {
        ...state,
        conversations: state.conversations.filter(
          (chat) => chat.id !== payload.id,
        ),
      }

    case SET_LAST_MESSAGE:
      return {
        ...state,
        conversations: state.conversations.map((chat) =>
          chat.id === payload.id
            ? { ...chat, lastMessage: payload.message || "" }
            : chat,
        ),
      }

    case GET_CONVERSATIONS_START:
      return { ...state, pending: true }
    // case GET_CONVERSATIONS_SUCCESS:
    //   return { ...state, pending: false, conversations: payload }
    case GET_CONVERSATIONS_ERROR:
      return { ...state, pending: false, error: payload }

    default:
      return state
  }
}
