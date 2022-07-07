import { get, ref, set } from "@firebase/database"
import { db } from "./firebase"

export const getProfile = async(id) => {
    const userRef = ref(db, `/profile/${id}`)

    return get(userRef)
}

export const updateProfile = async(userInfo) => {
    const userRef = ref(db, `/profile/${userInfo.id}`)

    set(userRef, userInfo)
}

export const updateRoomsCreated = async(userId, value) => {
    const roomsRef = ref(db, `/profile/${userId}/roomsCreated`)

    set(roomsRef, value)    
}

export const getRoomsCreated = async(userId) => {
    const roomsRef = ref(db, `/profile/${userId}/roomsCreated`)

    const snapshot = await get(roomsRef)
    console.log(snapshot.val())
    return snapshot.val()
}