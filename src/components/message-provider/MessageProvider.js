import { useState, useMemo, useCallback, useEffect } from "react"
import { useParams } from "react-router-dom"

export const MessageProvider = ({ children }) => {
  const { roomId } = useParams()

  const [conversations, setConversations] = useState([
    { title: "Room 1", id: "room1", currentInput: "" },
    { title: "Room 2", id: "room2", currentInput: "" },
    { title: "Room 3", id: "room3", currentInput: "" },
  ])

  const [messages, setMessages] = useState({
    room1: [{ message: "Hello from room 1!", author: "Bot", id: "1" }],
    room2: [{ message: "Welcome to room 2!", author: "Stranger", id: "1" }],
    room3: [{ message: "You are in room 3!", author: "Room Keeper", id: "1" }],
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
      messages: messages[roomId],
      currentInput: conversations.find((chat) => chat.id === roomId)
        ?.currentInput,
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
        const newMessage = { ...message, id: Date.now() }
        setMessages((messages) => {
          return {
            ...messages,
            [roomId]: [...(messages[roomId] || []), newMessage],
          }
        })
        updateConversations()
      },
    }),
    [roomId, updateConversations],
  )

  useEffect(() => {
    let timer
    if (roomId) {
      const lastMessage = messages[roomId][messages[roomId].length - 1]

      if (lastMessage.author === "User") {
        timer = setTimeout(() => {
          actions.sendMessage({ message: "Hello from bot!", author: "bot" })
        }, 500)
      }
      return () => clearTimeout(timer)
    }
  }, [messages, actions, roomId])

  return children([state, actions])
}
