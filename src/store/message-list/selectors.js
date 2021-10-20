export const getAllMessages = (state) => state.messageList.rooms || {}
export const getMessagesById = (roomId) => (state) =>
  state?.messageList.rooms[roomId] || ""
export const getMessagesInfo = (state) => state.messageList
export const getLastMessage = (roomId) => (state) => {
  const room = state.messageList.rooms[roomId] || []
  console.log(room)
  return room[room.length - 1] || { author: "", message: "", id: "" }
}
