import {
  APP_START_INIT,
  APP_FINISH_INIT,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_ERROR,
  MEMBERS_GET_SUCCESS,
  CHANNELS_GET_SUCCESS,
  CHANNEL_NEW_SUCCESS,
  MESSAGES_GET_SUCCESS,
  MESSAGE_RECEIVE,
  ONLINE_USERS,
  INIT_SOCKET,
  SOCKET_CONNECT,
  SOCKET_OPEN,
  SOCKET_CLOSE,
  SOCKET_ERROR,
  SOCKET_MESSAGE_SEND,
} from './constants';

export const actionAppStartInit = () => ({ type: APP_START_INIT });
export const actionAppFinishInit = (payload) => ({ type: APP_FINISH_INIT, payload });

export const actionUserGetRequest = (payload) => ({ type: USER_GET_REQUEST, payload });
export const actionUserGetSuccess = (payload) => ({ type: USER_GET_SUCCESS, payload });
export const actionUserGetError = () => ({ type: USER_GET_ERROR });

// Socket Requests
export const actionSocketMessageSend = (payload) => ({ type: SOCKET_MESSAGE_SEND, payload });
// Socket Response
export const actionMembersGetSuccess = (payload) => ({ type: MEMBERS_GET_SUCCESS, payload });
export const actionChannelsGetSuccess = (payload) => ({ type: CHANNELS_GET_SUCCESS, payload });
export const actionNewChannel = (payload) => ({ type: CHANNEL_NEW_SUCCESS, payload });
export const actionMessagesGetSuccess = (payload) => ({ type: MESSAGES_GET_SUCCESS, payload });
export const actionMessageReceive = (payload) => ({ type: MESSAGE_RECEIVE, payload });
export const actionMembersOnline = (payload) => ({ type: ONLINE_USERS, payload });

// Socket life circle
export const actionInitSocket = (payload) => ({ type: INIT_SOCKET, payload });
export const actionSocketConnect = (payload) => ({ type: SOCKET_CONNECT, payload });
export const actionSocketOpen = (payload) => ({ type: SOCKET_OPEN, payload });
export const actionSocketClose = (payload) => ({ type: SOCKET_CLOSE, payload });
export const actionSocketError = (payload) => ({ type: SOCKET_ERROR, payload });
