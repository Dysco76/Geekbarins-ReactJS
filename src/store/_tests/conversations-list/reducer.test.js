import {
    addNewChat,
    clearMessageInput,
    deleteChat,
    handleChangeMessageValue,
    setLastMessage,
    setMessageId
} from "../../conversations-list/actions"
import { conversationsReducer,  } from "../../conversations-list/reducer";

describe('conversations-list reducer', () => {
    it('add new chat action', () => {
        const state = conversationsReducer(
            {conversations: []},
            addNewChat({title: 'Test Chat', id: '1234'})
        )

        expect(state.conversations.length).toBe(1);
        expect(state.conversations[0]).toEqual({title: 'Test Chat', id: '1234', messageId: null})
    })

    it('delete chat action', () => {
        const state = conversationsReducer(
            {conversations: [{title: 'Chat 1', id: '1'}, {title: 'Chat2', id: '2'}]},
            deleteChat('1')
        )

        expect(state.conversations.length).toBe(1)
        expect(state.conversations[0].id).toBe('2')
    })

    it('handle change message value action', () => {
        const state = conversationsReducer(
            {conversations: [{title: 'Chat 1', id: '1'}]},
            handleChangeMessageValue('Test input', '1')
        )

        expect(state.conversations[0].currentInput).toBe('Test input')
    })

    it('clear message input action', () => {
        const state = conversationsReducer(
            {conversations: [{title: 'Chat 1', id: '1', currentInput: "Test"}]},
            clearMessageInput('1')
        )

        expect(state.conversations[0].currentInput).toBe('')
    })

    it('set message id action', () => {
        const state = conversationsReducer(
            {conversations: [{title: 'Chat 1', id: '1'}]},
            setMessageId('testId', '1')
        )

        expect(state.conversations[0].messageId).toBe('testId')
    })

    it('set last message action', () => {
        const message = {
            message: 'test message', 
            author: 'test author',
            id: 'message1'
        }
        const state = conversationsReducer(
            {conversations: [{title: 'Chat 1', id: '1', lastMessage: null}]},
            setLastMessage(message, '1')
        )

        expect(state.conversations[0].lastMessage).toEqual(message)
    })
})