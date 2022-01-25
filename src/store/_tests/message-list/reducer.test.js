import {
    addMessage, 
    deleteMessage, 
    editMessage, 
    addMessageRoom, 
    deleteMessageRoom,
    getMessagesStart,
    getMessagesSuccess,
    getMessagesError,
    receiveMessage,
    receiveMessageUpdate
} from "../../message-list/actions"
import { messagesReducer,  } from "../../message-list/reducer";

const message = {author: 'Test Author', message: 'Test Message', id: '1234' };
const createState = (config = {}) => {
    const {roomsCount, fillRooms} = config;
    const state = {rooms: {}}
    if (roomsCount) {
        for (let i = 1; i <= roomsCount; i++) {
            state.rooms[`room${i}`] = [];
            fillRooms && state.rooms[`room${i}`].push(message);
        }
    }
    return state;
}

describe ('message-list reducer', () => {
    it ('add message action', () => {
        const state = messagesReducer(
            createState(),
            addMessage(message, 'room1')
        )
        
        expect(state.rooms.room1.length).toBe(1)
        expect(state.rooms.room1[0].author).toBe('Test Author')
        expect(state.rooms.room1[0].message).toBe('Test Message')
    })

    it('delete message action', () => {
        const state = messagesReducer(
            createState({roomsCount: 2, fillRooms: true}),
            deleteMessage('1234', 'room1')
        )

        expect(state.rooms.room1.length).toBe(0)
        expect(state.rooms.room2.length).toBe(1)
    })

    it('edit message action', () => {
        const state = messagesReducer(
            createState({roomsCount: 2, fillRooms: true}),
            editMessage({...message, message: 'Edited'}, 'room1')
        )

        expect(state.rooms.room1[0].message).toBe('Edited')
        expect(state.rooms.room1[0].author).toBe('Test Author')
        expect(state.rooms.room2[0].message).toBe('Test Message')
    })

    it('add message room action', () => {
        const state = messagesReducer(
            createState(),
            addMessageRoom('room1', [message])
        )

        expect(state.rooms.room1).toBeDefined();
        expect(state.rooms.room1.length).not.toBe(0)
    })

    it('delete message room action', () => {
        const state = messagesReducer(
            createState({roomsCount: 1, fillRooms: true}),
            deleteMessageRoom('room1')
        )

        expect(state.rooms.room1).toBeUndefined()
    })

    it('get messages start action', () => {
        const state = messagesReducer(
            createState(),
            getMessagesStart()
        )

        expect(state.rooms).toBeDefined()
        expect(state.error).toBe(null)
        expect(state.pending).toBe(true)
    })

    it('get messages success action', () => {
        const state = messagesReducer(
            createState(),
            getMessagesSuccess()
        )

        expect(state.rooms).toBeDefined()
        expect(state.error).toBe(null)
        expect(state.pending).toBe(false)
    })

    it('get messages error action', () => {
        const state = messagesReducer(
            createState(),
            getMessagesError('Test Error')
        )

        expect(state.rooms).toBeDefined()
        expect(state.error).toBe('Test Error')
        expect(state.pending).toBe(false)
    })

    it('receive message action/no existing room - no new room added', () => {
        const state = messagesReducer(
            createState({roomsCount: 1}),
            receiveMessage(message, 'room2')
        )

        expect(state.rooms.room1.length).toBe(0);
        expect(state.rooms.room2).toBeUndefined()
    })

    it('receive message action/message does not exist in local store - message is added', () => {
        const state = messagesReducer(
            createState({roomsCount: 1}),
            receiveMessage(message, 'room1')
        )

        expect(state.rooms.room1.length).toBe(1);
        expect(state.rooms.room1[0].id).toBe('1234')
    })

    it('receive message action/message exists in local storage - message is not added', () => {
        const state = messagesReducer(
            createState({roomsCount: 1, fillRooms: true}),
            receiveMessage(message, 'room1')
        )

        expect(state.rooms.room1.length).toBe(1);
    })

    it('receive message action/message exists in local storage with old author name - author name is changed', () => {
        const state = messagesReducer(
            createState({roomsCount: 1, fillRooms: true}),
            receiveMessage({...message, author: 'New Author Name'}, 'room1')
        )

        expect(state.rooms.room1.length).toBe(1);
        expect(state.rooms.room1[0].author).toBe('New Author Name');
    })

    it('receive message update action', () => {
        const state = messagesReducer(
            createState({roomsCount: 2, fillRooms: true}),
            receiveMessageUpdate({...message, message: 'New Message Text'}, 'room1')
        )

        expect(state.rooms.room1.length).toBe(1);
        expect(state.rooms.room1[0].message).toBe('New Message Text');
        expect(state.rooms.room2[0].message).toBe('Test Message');
    })
})