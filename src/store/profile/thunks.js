import { updateMessagesAuthorNameFB } from "../message-list"
import { setProfileInfo, updateRoomsCreated } from "."

export const getProfileFB = (id) => async (dispatch, _, {profileApi}) => {
  try {
    const snapshot = await profileApi.getProfile(id)
    dispatch(setProfileInfo(snapshot.val()))
  } catch (err) {
    console.error(err)
  }
}

export const updateProfileFB = (userInfo) => async (dispatch, getState, {profileApi}) => {

  const currentUsername = getState().profile.user.name
  if (userInfo.name !== currentUsername) {
    dispatch(updateMessagesAuthorNameFB(userInfo.id, userInfo.name))
  }

  try {
    await profileApi.updateProfile(userInfo)
    dispatch(setProfileInfo(userInfo))
  } catch (err) {
    console.error(err)
  }
}

export const updateRoomsCreatedFB =
  (userId, operation) => async (dispatch, _, {profileApi}) => {

    try {
      const roomsCreated = Number(await profileApi.getRoomsCreated(userId))

      const value =
        operation === "increment" ? roomsCreated + 1 : roomsCreated - 1
      await profileApi.updateRoomsCreated(userId, value)
      dispatch(updateRoomsCreated(value))
    } catch (err) {
      console.error(err)
    }
  }
