import axios from 'axios';
import { API_BASE } from './config';

export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_ERROR = 'CREATE_GROUP_ERROR';

export const createGroupRequest = () => ({ type: CREATE_GROUP_REQUEST });
export const createGroupSuccess = (payload) => ({ type: CREATE_GROUP_SUCCESS, payload });
export const createGroupError = (error) => ({ type: CREATE_GROUP_ERROR, error });

export function createGroup(roomName) {
  return async function (dispatch) {
    dispatch(createGroupRequest());
    try {
      const response = await axios.get(`${API_BASE}/room?name=${roomName}`);
      dispatch(createGroupSuccess(response.data));
    } catch (error) {
      dispatch(createGroupError(error));
    }
  };
}

export const JOIN_GROUP_REQUEST = 'JOIN_GROUP_REQUEST';
export const JOIN_GROUP_SUCCESS = 'JOIN_GROUP_SUCCESS';
export const JOIN_GROUP_ERROR = 'JOIN_GROUP_ERROR';

export const joinGroupRequest = () => ({ type: JOIN_GROUP_REQUEST });
export const joinGroupSuccess = (payload) => ({ type: JOIN_GROUP_SUCCESS, payload });
export const joinGroupError = (error) => ({ type: JOIN_GROUP_ERROR, error });

export function joinGroup(roomId) {
  return async function (dispatch) {
    dispatch(joinGroupRequest());
    try {
      const response = await axios.get(`${API_BASE}/room/${roomId}`);
      dispatch(joinGroupSuccess(response.data));
    } catch (error) {
      dispatch(joinGroupError(error));
    }
  };
}

export const SET_USERNAME = 'SET_USERNAME';

export const setUsername = (username) => ({ type: SET_USERNAME, username });

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const UPDATE_CHAT_LOG = 'UPDATE_CHAT_LOG';

export const sendMessageRequest = (payload) => ({ type: SEND_MESSAGE_REQUEST, payload });
export const updateChatLog = (payload) => ({ type: UPDATE_CHAT_LOG, payload });
