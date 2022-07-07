import {
    ref,
    child,
    set,
    onChildChanged,
    onChildAdded,
    onChildRemoved,
  } from "firebase/database"
import { db } from "./firebase"

export const addNewChat = async(newChat) => {
    const conversationRef = ref(db, `conversations/`)

    set(child(conversationRef, newChat.id), newChat)
}

export const removeChat = async(chatId) => {
    const conversationRef = ref(db, 'conversations/')
    console.log(child(conversationRef, chatId))

    await set(child(conversationRef, chatId), null)
}

export const setLastMessage = async(message, chatId) => {
    const conversationRef = ref(db, `conversations/${chatId}`)

    set(child(conversationRef, "lastMessage"), message)
}

export const subscribeToLastMessage = async(chatId, callback) => {
    const conversationsRef = ref(db, `conversations/${chatId}`)

    return onChildChanged(conversationsRef, callback)
}

export const subscribeToChats = async({onChildAddedCb, onChildRemovedCb}) => {
    const conversationsRef = ref(db, `conversations/`)

    return {
        unsubscribeAdded: onChildAdded(conversationsRef, onChildAddedCb),
        unsubscribeRemoved: onChildRemoved(conversationsRef, onChildRemovedCb)
    }
}