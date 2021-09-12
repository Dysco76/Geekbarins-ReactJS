import { formatDate } from "../../utils"
import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  ADD_MESSAGE_ROOM,
  DELETE_MESSAGE_ROOM,
} from "./types"

const initialState = {
  room1: [
    {
      message: "Hello from room 1!",
      author: "Bot",
      date: formatDate(new Date()),
      id: Date.now(),
    },
  ],
  room2: [
    {
      message: "Welcome to room 2!",
      author: "Stranger",
      date: formatDate(new Date()),
      id: Date.now(),
    },
  ],
  room3: [
    {
      message: "You are in room 3!",
      author: "Room Keeper",
      date: formatDate(new Date()),
      id: Date.now(),
    },
  ],
}

export const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        [payload.roomId]: [
          ...state[payload.roomId],
          { ...payload.message, date: formatDate(new Date()), id: Date.now() },
        ],
      }
    }

    case DELETE_MESSAGE: {
      return {
        ...state,
        [payload.roomId]: state[payload.roomId].filter(
          (message) => message.id !== payload.messageId,
        ),
      }
    }

    case EDIT_MESSAGE: {
      const currentChat = state[payload.roomId]

      return {
        ...state,
        [payload.roomId]: currentChat.map((message) =>
          message.id === payload.message.id
            ? { ...message, message: payload.message.message }
            : message,
        ),
      }
    }

    case ADD_MESSAGE_ROOM: {
      return {
        ...state,
        [payload.newRoomId]: [],
      }
    }

    case DELETE_MESSAGE_ROOM: {
      const { [payload.id]: removedRoom, ...newState } = state
      return newState
    }

    default: {
      return state
    }
  }
}
