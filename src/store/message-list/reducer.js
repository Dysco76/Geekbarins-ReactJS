import { firebaseAuth } from "../../api/firebase"
import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  ADD_MESSAGE_ROOM,
  DELETE_MESSAGE_ROOM,
  GET_MESSAGES_START,
  GET_MESSAGES_ERROR,
  GET_MESSAGES_SUCCESS,
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGE_UPDATE,
} from "./types"

const auth = firebaseAuth.getAuth()

const initialState = {
  rooms: {},
  // room1: [
  //   {
  //     message: "Hello from room 1!",
  //     author: "Bot",
  //     date: formatDate(new Date()),
  //     id: Date.now(),
  //   },
  // ],
  // room2: [
  //   {
  //     message: "Welcome to room 2!",
  //     author: "Stranger",
  //     date: formatDate(new Date()),
  //     id: Date.now(),
  //   },
  // ],
  // room3: [
  //   {
  //     message: "You are in room 3!",
  //     author: "Room Keeper",
  //     date: formatDate(new Date()),
  //     id: Date.now(),
  //   },
  // ],
  pending: true,
  error: null,
}

export const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [payload.roomId]: [
            ...state.rooms[payload.roomId],
            { ...payload.message },
          ],
        },
      }
    }

    case DELETE_MESSAGE:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [payload.roomId]: state.rooms[payload.roomId].filter(
            (message) => message.id !== payload.messageId,
          ),
        },
      }

    case EDIT_MESSAGE: {
      const currentChat = state.rooms[payload.roomId]

      return {
        ...state,
        rooms: {
          ...state.rooms,
          [payload.roomId]: currentChat.map((message) =>
            message.id === payload.message.id
              ? { ...message, message: payload.message.message }
              : message,
          ),
        },
      }
    }

    case ADD_MESSAGE_ROOM: {
      return {
        ...state,
        rooms: { ...state.rooms, [payload.roomId]: payload.messages },
      }
    }

    case DELETE_MESSAGE_ROOM: {
      const { [payload.id]: removedRoom, ...restOfRooms } = state.rooms
      return { ...state, rooms: restOfRooms }
    }

    case GET_MESSAGES_START:
      return { ...state, error: null, pending: true }
    case GET_MESSAGES_SUCCESS:
      return { ...state, pending: false, error: null }
    case GET_MESSAGES_ERROR:
      return { ...state, pending: false, error: payload }

    case RECEIVE_MESSAGE: {
      if (!state.rooms[payload.roomId]) return state
      const messageExists = state.rooms[payload.roomId].find(
        (message) => message.id === payload.message.id,
      )

      if (
        !payload.message.authorId === auth.currentUser.uid &&
        !messageExists
      ) {
        return {
          ...state,
          rooms: {
            ...state.rooms,
            [payload.roomId]: [
              ...state.rooms[payload.roomId],
              { ...payload.message },
            ],
          },
        }
      } else if (
        messageExists &&
        payload.message.author !== messageExists.author
      ) {
        console.log("updating author")
        messageExists.author = payload.message.author
        return { ...state }
      } else {
        return state
      }
    }

    case RECEIVE_MESSAGE_UPDATE: {
      const currentChat = state.rooms[payload.roomId]

      return {
        ...state,
        rooms: {
          ...state.rooms,
          [payload.roomId]: currentChat.map((message) =>
            message.id === payload.message.id
              ? { ...payload.message }
              : message,
          ),
        },
      }
    }
    default: {
      return state
    }
  }
}
