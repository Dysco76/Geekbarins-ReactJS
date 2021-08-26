export const getAllMessages = (state) => state.messageList
export const getMessagesById = (roomId) => (state) =>
  state.messageList[roomId] || ""
