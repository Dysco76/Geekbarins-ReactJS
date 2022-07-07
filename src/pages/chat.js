import { useEffect, createContext, useState } from "react"
import { useDispatch } from "react-redux"
import { Layout, Header, ChatList, RoomContainer } from "../components"
import { subscribeToChatsFB } from "../store/conversations-list"
import { subscribeToMessageRoomsFB } from "../store/message-list"

export const SearchContext = createContext()

export const Chat = () => {
  const dispatch = useDispatch()

  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    const unsubscribe1 = dispatch(subscribeToChatsFB())
    const unsubscribe2 = dispatch(subscribeToMessageRoomsFB())

    return () => {
      unsubscribe1()
      unsubscribe2()
    }
  }, [dispatch])
  return (
    <SearchContext.Provider value={{searchString, setSearchString}}>
      <Layout header={<Header />} sidebar={<ChatList />} main={<RoomContainer />} />
    </SearchContext.Provider>
  )
}
