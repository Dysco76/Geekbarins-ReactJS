import { HANDLE_CHANGE_MESSAGE_VALUE } from "./types"

const initialState = [
  { title: "Room 1", id: "room1", currentInput: "" },
  { title: "Room 2", id: "room2", currentInput: "" },
  { title: "Room 3", id: "room3", currentInput: "" },
]

export const conversationsReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case HANDLE_CHANGE_MESSAGE_VALUE:
      return state.map((chat) =>
        chat.id === payload.roomId
          ? { ...chat, currentInput: payload.value }
          : chat,
      )

    default:
      return state
  }
}
