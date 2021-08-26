export const getConversations = (state) => state.conversations
export const getCurrentInput = (roomId) => (state) =>
  state.conversations.find((chat) => chat.id === roomId).currentInput || ""
