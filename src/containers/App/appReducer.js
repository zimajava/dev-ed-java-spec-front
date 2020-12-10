import {
  APP_FINISH_INIT,
  USER_GET_SUCCESS,
  MEMBERS_GET_SUCCESS,
  CHANNELS_GET_SUCCESS,
  CHANNEL_NEW_SUCCESS,
  MESSAGES_GET_SUCCESS,
  MESSAGE_RECEIVE,
  ONLINE_USERS,
} from './constants';

export const initialState = {
  isReady: false,
  currentUser: {},
  users: [],
  reformattedUsers: {},
  currentRoomMessages: [],
  rooms: [],
  onlineUsers: [],
};

export const appReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case APP_FINISH_INIT: {
      return { ...state, isReady: true };
    }
    case USER_GET_SUCCESS: {
      return { ...state, currentUser: payload.data || {} };
    }
    case MEMBERS_GET_SUCCESS: {
      return { ...state, users: payload.data };
    }
    case CHANNELS_GET_SUCCESS: {
      return { ...state, rooms: payload.data };
    }
    case CHANNEL_NEW_SUCCESS: {
      return { ...state, rooms: [...state.rooms, ...payload.data] };
    }
    case MESSAGES_GET_SUCCESS: {
      return { ...state, currentRoomMessages: payload.data };
    }
    case MESSAGE_RECEIVE: {
      return { ...state, currentRoomMessages: [...state.currentRoomMessages, ...payload.data] };
    }
    case ONLINE_USERS: {
      return { ...state, onlineUsers: payload.data };
    }
    default: {
      return state;
    }
  }
};
