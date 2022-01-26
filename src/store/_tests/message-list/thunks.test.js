import {
    setMessageId,
    clearMessageInput
} from '../../conversations-list'
import {
    sendMessageThunk,
    removeMessageThunk,
    editMessageThunk,
    deleteMessage,
    addMessage,
    editMessage,
} from '../../message-list'

const MESSAGE = {message: 'Test message', author: 'Test Author', id: 'message1'};
const ROOMID = 'room1';
const messageListApi = {
    sendMessage: jest.fn(),
    removeMessage: jest.fn(),
    editMessage: jest.fn(),
};
const dispatch = jest.fn().mockName('dispatch');
const getStateStub = () => {
    const state = {
        messageList: {
            rooms: {
                room1: [MESSAGE, {...MESSAGE, id: 'message2'}]
            }
        }
    }

    return state;
}

const realConsoleError = Object.create(global.console.error);
const consoleErrorStub = jest.fn();

beforeEach(() => {
    global.console.error = consoleErrorStub;
})

afterEach(() => {
    global.console.error = realConsoleError
})


describe('send message thunk', () => {
    it('sends message successfully', async () => {
        const thunk = sendMessageThunk(MESSAGE, ROOMID);

        await thunk(dispatch, null, {messageListApi});

        expect(messageListApi.sendMessage).toBeCalledTimes(1);
        expect(messageListApi.sendMessage).toBeCalledWith(MESSAGE, ROOMID);

        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, addMessage(MESSAGE, ROOMID));
        expect(dispatch.mock.calls[1][0].name).toBe('setMessage');
    })

    it('logs an error when error is thrown', async () => {
        const thunk = sendMessageThunk(MESSAGE, ROOMID);
        
        messageListApi.sendMessage.mockRejectedValueOnce('error');

        await thunk(dispatch, getStateStub, {messageListApi});

        expect(messageListApi.sendMessage).toBeCalledTimes(1);
        expect(messageListApi.sendMessage).toBeCalledWith(MESSAGE, ROOMID);

        expect(dispatch).toBeCalledTimes(1);
        expect(console.error).toBeCalledWith('error')
    })
});

describe('remove message thunk', () => {
    it('removes message successfully', async () => {
        const thunk = removeMessageThunk(MESSAGE.id, ROOMID);

        const newLastMessage = await thunk(dispatch, getStateStub, {messageListApi});

        expect(messageListApi.removeMessage).toBeCalledTimes(1);
        expect(messageListApi.removeMessage).toBeCalledWith(MESSAGE.id, ROOMID);

        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, deleteMessage(MESSAGE.id, ROOMID));
        expect(dispatch.mock.calls[1][0].name).toBe('setMessage');
        expect(newLastMessage).toEqual({...MESSAGE, id: 'message2'});
    })

    it('logs an error when error is thrown', async () => {
        const thunk = removeMessageThunk(MESSAGE.id, ROOMID);
        messageListApi.removeMessage.mockRejectedValueOnce('error')

        const newLastMessage = await thunk(dispatch, getStateStub, {messageListApi});

        expect(messageListApi.removeMessage).toBeCalledTimes(1);
        expect(messageListApi.removeMessage).toBeCalledWith(MESSAGE.id, ROOMID);

        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, deleteMessage(MESSAGE.id, ROOMID));
        expect(newLastMessage).toBeUndefined();
        expect(console.error).toBeCalledWith('error');
    })
})

describe('edit message thunk', () => {
    it('edits message successfully', async () => {
        const editedMessage = {...MESSAGE, message: 'Edited Message'}
        const thunk = editMessageThunk(editedMessage, ROOMID);

        await thunk(dispatch, getStateStub, {messageListApi});

        expect(dispatch).toBeCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, editMessage(editedMessage, ROOMID));
        expect(dispatch).toHaveBeenNthCalledWith(2, clearMessageInput(ROOMID));
        expect(dispatch).toHaveBeenNthCalledWith(3, setMessageId('', ROOMID));
    })

    it('changes conversation last message when edited message is current last message', async () => {
        const editedMessage = {...MESSAGE, id: 'message2'}
        const thunk = editMessageThunk(editedMessage, ROOMID);

        await thunk(dispatch, getStateStub, {messageListApi});

        expect(dispatch).toBeCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, editMessage(editedMessage, ROOMID));
        expect(dispatch.mock.calls[1][0].name).toBe('setMessage');
    })

    it('logs an error when error is thrown', async () => {
        const editedMessage = {...MESSAGE, message: 'Edited Message'}
        const thunk = editMessageThunk(editedMessage, ROOMID);
        messageListApi.editMessage.mockRejectedValueOnce('error')

        await thunk(dispatch, getStateStub, {messageListApi});

        expect(dispatch).toBeCalledTimes(1);
        expect(console.error).toBeCalledWith('error');
    })
})