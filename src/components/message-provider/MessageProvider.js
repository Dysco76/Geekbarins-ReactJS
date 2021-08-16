import { useState, useMemo, useCallback, useEffect } from "react"
import { useParams } from "react-router-dom"
import { formatDate } from "../../utils"

export const MessageProvider = ({ children }) => {
  const { roomId } = useParams()

  const [conversations, setConversations] = useState([
    { title: "Room 1", id: "room1", currentInput: "" },
    { title: "Room 2", id: "room2", currentInput: "" },
    { title: "Room 3", id: "room3", currentInput: "" },
  ])

  const [messages, setMessages] = useState({
    room1: [
      {
        message: "Hello from room 1!",
        author: "Bot",
        date: formatDate(new Date()),
        id: "1",
      },
    ],
    room2: [
      {
        message: "Welcome to room 2!",
        author: "Stranger",
        date: formatDate(new Date()),
        id: "1",
      },
    ],
    room3: [
      {
        message: "You are in room 3!",
        author: "Room Keeper",
        date: formatDate(new Date()),
        id: "1",
      },
    ],
  })

  const updateConversations = useCallback(
    (value = "") => {
      setConversations((conversations) =>
        conversations.map((conversation) => {
          return conversation.id === roomId
            ? { ...conversation, currentInput: value }
            : conversation
        }),
      )
    },
    [roomId],
  )

  const state = useMemo(
    () => ({
      conversations,
      allMessages: messages,
      messages: messages[roomId],
      currentInput: conversations.find((chat) => chat.id === roomId)
        ?.currentInput,
      chatExists: conversations.some((chat) => chat.id === roomId),
    }),
    [conversations, messages, roomId],
  )

  const actions = useMemo(
    () => ({
      handleInput: (e) => {
        const { value } = e.target
        updateConversations(value)
      },

      sendMessage: (message) => {
        const newMessage = {
          ...message,
          date: formatDate(new Date()),
          id: Date.now(),
        }
        setMessages((messages) => {
          return {
            ...messages,
            [roomId]: [...(messages[roomId] || []), newMessage],
          }
        })
        message.author === "User" && updateConversations()
      },
    }),
    [roomId, updateConversations],
  )

  useEffect(() => {
    let timer
    if (state.chatExists) {
      const lastMessage = messages[roomId][messages[roomId].length - 1]

      if (lastMessage.author === "User") {
        timer = setTimeout(() => {
          actions.sendMessage({ message: "Hello from bot!", author: "bot" })
        }, 1000)
      }
      return () => clearTimeout(timer)
    }
  }, [messages, state, roomId, actions])

  return children([state, actions])
}
