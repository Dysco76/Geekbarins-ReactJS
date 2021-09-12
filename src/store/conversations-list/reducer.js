import {
  HANDLE_CHANGE_MESSAGE_VALUE,
  CLEAR_MESSAGE_INPUT,
  SET_MESSAGE_ID,
  ADD_NEW_CHAT,
} from "./types"

const initialState = [
  { title: "Room 1", id: "room1", currentInput: "", messageId: null },
  { title: "Room 2", id: "room2", currentInput: "", messageId: null },
  { title: "Room 3", id: "room3", currentInput: "", messageId: null },
]

const setInputValue = (state, payload) =>
  state.map((chat) =>
    chat.id === payload.roomId
      ? { ...chat, currentInput: payload?.value || "" }
      : chat,
  )

export const conversationsReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case HANDLE_CHANGE_MESSAGE_VALUE:
      return setInputValue(state, payload)

    case CLEAR_MESSAGE_INPUT:
      return setInputValue(state, payload)

    case SET_MESSAGE_ID:
      return state.map((chat) =>
        chat.id === payload.roomId
          ? { ...chat, messageId: payload?.messageId || null }
          : chat,
      )

    case ADD_NEW_CHAT:
      return [
        ...state,
        {
          title: payload.name,
          id: payload.id,
          currentInput: "",
          messageId: null,
        },
      ]

    default:
      return state
  }
}
