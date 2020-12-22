import {
  APP_START_INIT,
  APP_FINISH_INIT,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_ERROR,
  USERS_GET_SUCCESS,
  GROUPS_GET_SUCCESS,
  GROUP_NEW_SUCCESS,
  MESSAGES_GET_SUCCESS,
  ONLINE_USERS,
  INIT_SOCKET,
  SOCKET_CONNECT,
  SOCKET_OPEN,
  SOCKET_CLOSE,
  SOCKET_ERROR,
  SOCKET_MESSAGE_SEND,
  SOCKET_MESSAGE_RECEIVE,
} from './constants';

export const actionAppStartInit = () => ({ type: APP_START_INIT });
export const actionAppFinishInit = (payload) => ({ type: APP_FINISH_INIT, payload });

export const actionUserGetRequest = (payload) => ({ type: USER_GET_REQUEST, payload });
export const actionUserGetSuccess = (payload) => ({ type: USER_GET_SUCCESS, payload });
export const actionUserGetError = () => ({ type: USER_GET_ERROR });

// Socket Requests
export const actionSocketMessageSend = (payload) => ({ type: SOCKET_MESSAGE_SEND, payload });
// Socket Response
export const actionUsersGetSuccess = (payload) => ({ type: USERS_GET_SUCCESS, payload });
export const actionGroupsGetSuccess = (payload) => ({ type: GROUPS_GET_SUCCESS, payload });
export const actionNewGroup = (payload) => ({ type: GROUP_NEW_SUCCESS, payload });
export const actionMessagesGetSuccess = (payload) => ({ type: MESSAGES_GET_SUCCESS, payload });
export const actionUsersOnline = (payload) => ({ type: ONLINE_USERS, payload });

// Socket life circle
export const actionInitSocket = (payload) => ({ type: INIT_SOCKET, payload });
export const actionSocketConnect = (payload) => ({ type: SOCKET_CONNECT, payload });
export const actionSocketOpen = (payload) => ({ type: SOCKET_OPEN, payload });
export const actionSocketClose = (payload) => ({ type: SOCKET_CLOSE, payload });
export const actionSocketError = (payload) => ({ type: SOCKET_ERROR, payload });
export const actionSocketMessageReceive = (payload) => ({ type: SOCKET_MESSAGE_RECEIVE, payload });
