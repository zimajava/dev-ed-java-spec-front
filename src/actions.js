import axios from 'axios';
import { API_BASE } from './config';

export const CREATE_ROOM_REQUEST = 'CREATE_ROOM_REQUEST';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR';

export const createRoomRequest = () => ({ type: CREATE_ROOM_REQUEST });
export const createRoomSuccess = (payload) => ({ type: CREATE_ROOM_SUCCESS, payload });
export const createRoomError = (error) => ({ type: CREATE_ROOM_ERROR, error });

export function createRoom(roomName) {
  return async function (dispatch) {
    dispatch(createRoomRequest());
    try {
      const response = await axios.get(`${API_BASE}/room?name=${roomName}`);
      dispatch(createRoomSuccess(response.data));
    } catch (error) {
      dispatch(createRoomError(error));
    }
  };
}

export const JOIN_ROOM_REQUEST = 'JOIN_ROOM_REQUEST';
export const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS';
export const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR';

export const joinRoomRequest = () => ({ type: JOIN_ROOM_REQUEST });
export const joinRoomSuccess = (payload) => ({ type: JOIN_ROOM_SUCCESS, payload });
export const joinRoomError = (error) => ({ type: JOIN_ROOM_ERROR, error });

export function joinRoom(roomId) {
  return async function (dispatch) {
    dispatch(joinRoomRequest());
    try {
      const response = await axios.get(`${API_BASE}/room/${roomId}`);
      dispatch(joinRoomSuccess(response.data));
    } catch (error) {
      dispatch(joinRoomError(error));
    }
  };
}

export const SET_USERNAME = 'SET_USERNAME';

export const setUsername = (username) => ({ type: SET_USERNAME, username });

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const UPDATE_CHAT_LOG = 'UPDATE_CHAT_LOG';

export const sendMessageRequest = (payload) => ({ type: SEND_MESSAGE_REQUEST, payload });
export const updateChatLog = (payload) => ({ type: UPDATE_CHAT_LOG, payload });
