import {
  SET_PROFILE_INFO,
  UPDATE_ROOMS_CREATED,
} from "./types"

export const setProfileInfo = (payload) => ({
  type: SET_PROFILE_INFO,
  payload,
})

export const updateRoomsCreated = (payload) => ({
  type: UPDATE_ROOMS_CREATED,
  payload,
})
