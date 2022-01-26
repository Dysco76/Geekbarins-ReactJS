import {
    addNewChatThunk, 
    deleteChatThunk,
    setLastMessageFB,
    setLastMessage
} from '../../conversations-list'

const conversationsListApi = {
    addNewChat: jest.fn(),
    deleteChat: jest.fn(),
    setLastMessage: jest.fn(),
};

const dispatch = jest.fn().mockName('dispatch');

const CHAT = {title: 'Test Chat', id: 'chat1', messageId: null};
const MESSAGE = {message: 'Test Message', id: 'message1'};

const realConsoleError = Object.create(global.console.error);
const consoleErrorStub = jest.fn();

beforeEach(() => {
    global.console.error = consoleErrorStub;
})

afterEach(() => {
    global.console.error = realConsoleError;
})

describe('add new chat thunk', () => {
    it('adds new chat successfully', async() => {
        const thunk = addNewChatThunk(CHAT);

        await thunk(dispatch, null, {conversationsListApi});

        expect(conversationsListApi.addNewChat).toBeCalledTimes(1);
        expect(conversationsListApi.addNewChat).toBeCalledWith(CHAT);

        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch.mock.calls[0][0].name).toBe('addNewRoom')
    })

    it('logs error when an error is thrown', async() => {
        const errorMessage = 'add new chat error';
        const thunk = addNewChatThunk(CHAT);
        conversationsListApi.addNewChat.mockRejectedValueOnce(errorMessage);

        await thunk(dispatch, null, {conversationsListApi});

        expect(conversationsListApi.addNewChat).toBeCalledTimes(1);
        expect(conversationsListApi.addNewChat).toBeCalledWith(CHAT);

        expect(dispatch).toBeCalledTimes(0);
        expect(console.error).toBeCalledWith(errorMessage);
    })
})

describe('delete chat thunk', () => {
    it('deletes chat successfully', async () => {
        const thunk = deleteChatThunk(CHAT.id);

        await thunk(dispatch, null, {conversationsListApi});

        expect(conversationsListApi.deleteChat).toBeCalledTimes(1);
        expect(conversationsListApi.deleteChat).toBeCalledWith(CHAT.id);

        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch.mock.calls[0][0].name).toBe('removeRoom')
    })

    it('logs error when an error is thrown', async () => {
        const errorMessage = 'delete chat error';
        const thunk = deleteChatThunk(CHAT.id);
        conversationsListApi.deleteChat.mockRejectedValueOnce(errorMessage);

        await thunk(dispatch, null, {conversationsListApi});

        expect(conversationsListApi.deleteChat).toBeCalledTimes(1);
        expect(conversationsListApi.deleteChat).toBeCalledWith(CHAT.id);

        expect(dispatch).toBeCalledTimes(0);
        expect(console.error).toBeCalledWith(errorMessage);
    })
})

describe('set last message fb thunk', () => {
    it('sets last message successfully', async () => {
        const thunk = setLastMessageFB(MESSAGE, CHAT.id);

        await thunk(dispatch, null, {conversationsListApi});

        expect(conversationsListApi.setLastMessage).toBeCalledTimes(1);
        expect(conversationsListApi.setLastMessage).toBeCalledWith(MESSAGE, CHAT.id);

        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toBeCalledWith(setLastMessage(MESSAGE, CHAT.id));
    })

    it('logs error when an error is thrown', async () => {
        const errorMessage = 'set last message error'
        const thunk = setLastMessageFB(MESSAGE, CHAT.id);
        conversationsListApi.setLastMessage.mockRejectedValueOnce(errorMessage)

        await thunk(dispatch, null, {conversationsListApi});

        expect(conversationsListApi.setLastMessage).toBeCalledTimes(1);
        expect(conversationsListApi.setLastMessage).toBeCalledWith(MESSAGE, CHAT.id);

        expect(dispatch).toBeCalledTimes(0);
        expect(console.error).toBeCalledWith(errorMessage);
    })
})