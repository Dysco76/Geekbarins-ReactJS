import {
    ref,
    set,
    child,
    update,
    onChildAdded,
    onChildChanged,
    onChildRemoved,
  } from "firebase/database"
import { db } from "./firebase"

export const sendMessage = async (message, roomId) => {
    const messageRoomRef = ref(db, `messages/${roomId}`);

    set(child(messageRoomRef, message.id), message)
}

export const removeMessage = async(messageId, roomId) => {
    const messageRoomRef = ref(db, `messages/${roomId}`)

    set(child(messageRoomRef, messageId), null)
}

export const editMessage = async(message, roomId) => {
    const messageRef = ref(db, `messages/${roomId}/${message.id}`)

    set(child(messageRef, "/message"), message.message)
}

export const addMessageRoom = async(id, firstMessage) => {
    const messageRoomsRef = ref(db, `messages/`)

    set(child(messageRoomsRef, id), { 0: firstMessage })
}

export const removeMessageRoom = async(id) => {
    const messageRoomsRef = ref(db, `messages/`)

    set(child(messageRoomsRef, id), null)
}

export const subscribeToMessageRooms = async(onChildAddedCb, onChildRemovedCb) => {
    const messageRoomsRef = ref(db, `messages/`)

    const unsubscribe = onChildAdded(messageRoomsRef, onChildAddedCb)

    onChildRemoved(messageRoomsRef, onChildRemovedCb)

    return unsubscribe;
}

export const subscribeToMessages = async(roomId, {onChildAddedCb, onChildChangedCb, onChildRemovedCb}) => {
    const messageRoomRef = ref(db, `messages/${roomId}`)

    const unsubscribeAdded = onChildAdded(messageRoomRef, onChildAddedCb)
    const unsubscribeChanged = onChildChanged(messageRoomRef, onChildChangedCb)
    const unsubscribeRemoved = onChildRemoved(messageRoomRef, onChildRemovedCb)

    return {
        unsubscribeAdded,
        unsubscribeChanged,
        unsubscribeRemoved
    }
}

export const updateMessagesAuthor = async(updates) => {
    update(ref(db), updates);
}