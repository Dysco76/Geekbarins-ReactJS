import { SET_PROFILE_INFO, UPDATE_ROOMS_CREATED } from "./types"

const initialState = {
  user: {
    name: "user",
    phone: "",
    id: "0",
  },
}

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PROFILE_INFO:
      return {
        ...state,
        user: payload,
      }

    case UPDATE_ROOMS_CREATED:
      return {
        ...state,
        user: {
          ...state.user,
          roomsCreated: payload,
        },
      }
    default:
      return state
  }
}
