export const getConversations = (state) => state.conversations.conversations
export const getCurrentInput = (roomId) => (state) =>
  state.conversations.conversations.find((chat) => chat.id === roomId)
    ?.currentInput || ""
export const getExistingMessageId = (roomId) => (state) =>
  state.conversations.conversations.find((chat) => chat.id === roomId)
    ?.messageId || null

export const getConversationsInfo = (state) => state.conversations

export const getConversationsNames = (state) =>
  state.conversations.conversations.map((room) => room.title)
