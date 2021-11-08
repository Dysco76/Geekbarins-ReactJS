import { get, ref, set } from "@firebase/database"
import { db } from "../../api/firebase"
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

export const updateProfileFB = (userInfo) => async (dispatch) => {
  const userRef = ref(db, `/profile/${userInfo.id}`)

  try {
    await set(userRef, userInfo)
    dispatch(setProfileInfo(userInfo))
  } catch (err) {
    console.error(err)
  }
}

export const updateRoomsCreatedFB = (userId, value) => async (dispatch) => {
  const roomsRef = ref(db, `/profile/${userId}/roomsCreated`)

  try {
    await set(roomsRef, value)
    dispatch(updateRoomsCreated(value))
  } catch (err) {
    console.error(err)
  }
}
