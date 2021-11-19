import { get, ref, set } from "@firebase/database"
import { db } from "../../api/firebase"
import { updateMessagesAuthorNameFB } from "../message-list"
import { setProfileInfo, updateRoomsCreated } from "."

export const getProfileFB = (id) => async (dispatch) => {
  const userRef = ref(db, `/profile/${id}`)

  try {
    const snapshot = await get(userRef)
    dispatch(setProfileInfo(snapshot.val()))
  } catch (err) {
    console.error(err)
  }
}

export const updateProfileFB = (userInfo) => async (dispatch, getState) => {
  const userRef = ref(db, `/profile/${userInfo.id}`)

  const currentUsername = getState().profile.user.name
  if (userInfo.name !== currentUsername) {
    dispatch(updateMessagesAuthorNameFB(userInfo.id, userInfo.name))
  }

  try {
    await set(userRef, userInfo)
    dispatch(setProfileInfo(userInfo))
  } catch (err) {
    console.error(err)
  }
}

export const updateRoomsCreatedFB =
  (userId, operation) => async (dispatch, getState) => {
    const roomsRef = ref(db, `/profile/${userId}/roomsCreated`)

    try {
      const roomsCreated = (await get(roomsRef)).val()
      const value =
        operation === "increment" ? roomsCreated + 1 : roomsCreated - 1
      await set(roomsRef, value)
      dispatch(updateRoomsCreated(value))
    } catch (err) {
      console.error(err)
    }
  }
