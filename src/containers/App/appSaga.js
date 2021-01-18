import { put, takeLatest, call, select, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import axios from 'axios';
import { API_BASE, WS_BASE } from '../../config';
import { selectUserAuthData } from '../Auth/selectors';
import { actionAppLogOut } from '../Auth/actions';
import {
  APP_START_INIT,
  INIT_SOCKET,
  SOCKET_CONNECT,
  SOCKET_MESSAGE_SEND,
  SOCKET_CLOSE,
  SOCKET_OPEN,
  // USER_GET_SUCCESS,
  // USERS_GET_SUCCESS,
  GROUPS_GET_SUCCESS,
  SOCKET_COMMANDS,
  SOCKET_MESSAGE_RECEIVE,
} from './constants';
import {
  actionAppFinishInit,
  actionInitSocket,
  actionSocketConnect,
  actionSocketOpen,
  actionSocketError,
  actionSocketMessageSend,
  actionUserGetSuccess,
  actionUsersGetSuccess,
  actionGroupsGetSuccess,
  // actionNewGroup,
  // actionMessagesGetSuccess,
  // actionMessageReceive,
  // actionUsersOnline,
  actionSocketClose,
  actionSocketMessageReceive,
  actionMessageReceive,
  // actionGroupMessagesGetSuccess,
  // actionGroupMessageReceive,
  // actionOnlineUsers,
} from './actions';

const {
  CHAT_GROUP_CREATE,
  CHAT_PRIVATE_CREATE,
  CHAT_UPDATE,
  CHAT_DELETE,
  CHAT_LEAVE,
  CHAT_JOIN,
  CHATS_GET_BY_USER_ID,
  MESSAGE_SEND,
  MESSAGE_UPDATE,
  MESSAGE_DELETE,
  MESSAGES_GET_BY_CHAT_ID,
  VIDEO_CALL_START,
  VIDEO_CALL_JOIN,
  VIDEO_CALL_EXIT,
} = SOCKET_COMMANDS;

function* handleGetCurrentUser() {
  try {
    const { userId, accessToken } = yield select(selectUserAuthData);

    const requestURL = `${API_BASE}/zipli/myAccount/getUser`;

    const allUsers = yield axios
      .get(requestURL, { params: { userId, token: accessToken } })
      .then((response) => response.data);

    yield put(actionSocketMessageReceive({ command: 'currentUser', data: allUsers }));
  } catch (e) {
    console.error(e);
  }
}

function* handleGetAllUsers() {
  try {
    const { accessToken } = yield select(selectUserAuthData);

    const requestURL = `${API_BASE}/zipli/сhat/getAllUsers`;

    const currentUser = yield axios
      .get(requestURL, { params: { token: accessToken } })
      .then((response) => response.data);

    yield put(actionSocketMessageReceive({ command: 'users', data: currentUser }));
  } catch (e) {
    console.error(e);
  }
}

function* handleAppStartInit() {
  try {
    const { accessToken } = yield select(selectUserAuthData);

    yield put(actionInitSocket({ token: accessToken }));
  } catch (e) {
    console.error(e);
  }
}

function* handleSocketInit(action) {
  const { payload } = action;

  try {
    const socket = new WebSocket(`${WS_BASE}?token=${payload.token}`);
    yield put(actionSocketConnect({ socket }));
  } catch (e) {
    console.error(e);
  }
}

function watchMessage(payload) {
  const { socket } = payload;

  return eventChannel((emitter) => {
    socket.onopen = (event) => emitter(actionSocketOpen(event));
    socket.onclose = (event) => emitter(actionSocketClose(event));
    socket.onerror = (event) => emitter(actionSocketError(event));
    socket.onmessage = (event) => emitter(actionSocketMessageReceive(JSON.parse(event.data)));

    // Returning a cleanup function, to be called if the saga completes or is cancelled
    return () => socket.close();

    // socket.on(USER, (data) => {
    //   if (!data) {
    //     emitter(actionAppLogOut());
    //   }
    //
    //   emitter(actionUserGetSuccess({ data }));
    // });
  });
}

function* internalListener({ socket }) {
  try {
    while (true) {
      const { payload } = yield take(SOCKET_MESSAGE_SEND);
      socket.send(JSON.stringify(payload));
    }
  } catch (e) {
    console.error(e);
  }
}

function* externalListener(socketChannel) {
  try {
    while (true) {
      const action = yield take(socketChannel);
      yield put(action);
    }
  } catch (e) {
    console.error(e);
  }
}

function* handleSocketManager(action) {
  const { payload } = action;

  try {
    const socketChannel = yield call(watchMessage, payload);

    yield fork(externalListener, socketChannel);
    yield fork(internalListener, payload);

    const cancel = yield take(SOCKET_CLOSE);

    if (cancel) {
      socketChannel.close();
    }
  } catch (e) {
    console.error(e);
  }
}

function* handleGetInitialData() {
  try {
    const { userId } = yield select(selectUserAuthData);

    yield call(handleGetCurrentUser);
    yield call(handleGetAllUsers);
    yield put(
      actionSocketMessageSend({
        command: CHATS_GET_BY_USER_ID,
        data: { chatName: '', secondUserId: '', idUser: userId, idChat: '' },
      }),
    );

    yield take([GROUPS_GET_SUCCESS]);
    yield put(actionAppFinishInit());
  } catch (e) {
    console.error(e);
  }
}

function* receiveMessages(action) {
  const {
    payload: { command, data, message },
  } = action;

  try {
    switch (command) {
      case 'currentUser': {
        if (!data) {
          yield put(actionAppLogOut());
        }
        yield put(actionUserGetSuccess({ data }));
        break;
      }
      case 'users': {
        yield put(actionUsersGetSuccess({ data }));
        break;
      }
      case CHATS_GET_BY_USER_ID: {
        yield put(actionGroupsGetSuccess({ data: message }));
        break;
      }
      case MESSAGE_SEND: {
        if (Array.isArray(message)) {
          yield put(actionMessageReceive({ data: message }));
        }
        break;
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export function* appSaga() {
  yield takeLatest(APP_START_INIT, handleAppStartInit);
  yield takeLatest(INIT_SOCKET, handleSocketInit);
  yield takeLatest(SOCKET_CONNECT, handleSocketManager);
  yield takeLatest(SOCKET_OPEN, handleGetInitialData);
  yield takeLatest(SOCKET_MESSAGE_RECEIVE, receiveMessages);
}
