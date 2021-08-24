import { UPDATE_PROFILE_INFO } from "./types"

const initialState = {
  user: {
    id: "test-user",
    name: "User",
    phone: "1234567",
    age: "18",
  },
}

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PROFILE_INFO:
      return {
        ...state,
        user: {
          name: payload.name,
          phone: payload.phone,
          age: payload.age,
        },
      }
    default:
      return state
  }
}
