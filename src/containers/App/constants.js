export const APP_START_INIT = 'APP_START_INIT';
export const APP_FINISH_INIT = 'APP_FINISH_INIT';

export const USER_GET_REQUEST = 'USER_GET_REQUEST';
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const USER_GET_ERROR = 'USER_GET_ERROR';

export const MEMBERS_GET_SUCCESS = 'MEMBERS_GET_SUCCESS';
export const CHANNELS_GET_SUCCESS = 'CHANNELS_GET_SUCCESS';
export const CHANNEL_NEW_SUCCESS = 'CHANNEL_NEW_SUCCESS';
export const MESSAGES_GET_SUCCESS = 'MESSAGES_GET_SUCCESS';
export const MESSAGE_RECEIVE = 'MESSAGE_RECEIVE';
export const ONLINE_USERS = 'ONLINE_USERS';

export const INIT_SOCKET = 'INIT_SOCKET';
export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export const SOCKET_OPEN = 'SOCKET_OPEN';
export const SOCKET_CLOSE = 'SOCKET_CLOSE';
export const SOCKET_ERROR = 'SOCKET_ERROR';
export const SOCKET_MESSAGE_RECEIVE = 'SOCKET_MESSAGE_RECEIVE';
export const SOCKET_MESSAGE_SEND = 'SOCKET_MESSAGE_SEND';

export const SOCKET_COMMANDS = {
  MEMBER: 'member',
  MEMBER_EDIT: 'member:edit',
  MEMBERS: 'members',
  MEMBERS_ONLINE: 'members:online',
  CHANNEL_CREATE: 'channel:create',
  CHANNELS: 'channels',
  ROOM_JOIN: 'room:join',
  ROOM_LEAVE: 'room:leave',
  EDITOR_TYPING: 'editor:typing',
  EDITOR_STOP_TYPING: 'editor:stop-typing',
  MESSAGE_ADD: 'message:add',
  MESSAGE_EDIT: 'message:edit',
  MESSAGE_DELETE: 'message:delete',
  DISCONNECT: 'disconnect',
};
