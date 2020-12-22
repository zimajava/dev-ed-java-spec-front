import { put, takeLatest, call, select, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { WS_BASE } from '../../config';
import { selectUserAuthData } from '../Auth/selectors';
import { actionAppLogOut } from '../Auth/actions';
import {
  APP_START_INIT,
  INIT_SOCKET,
  SOCKET_CONNECT,
  SOCKET_MESSAGE_SEND,
  SOCKET_CLOSE,
  SOCKET_OPEN,
  USER_GET_SUCCESS,
  USERS_GET_SUCCESS,
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
  // actionGroupMessagesGetSuccess,
  // actionGroupMessageReceive,
  // actionOnlineUsers,
} from './actions';

const {
  USER,
  // USER_EDIT,
  USERS,
  // USERS_ONLINE,
  // GROUP_CREATE,
  GROUPS,
  // GROUP_JOIN,
  // GROUP_LEAVE,
  // EDITOR_TYPING,
  // EDITOR_STOP_TYPING,
  // MESSAGE_ADD,
  // MESSAGE_EDIT,
  // MESSAGE_DELETE,
  // DISCONNECT,
} = SOCKET_COMMANDS;

function* handleAppStartInit() {
  try {
    const { tokens } = yield select(selectUserAuthData);

    yield put(actionInitSocket({ token: tokens.accessToken }));
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

function* internalListener(socket) {
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
    const socketChannel = yield call(watchMessage, payload.socket);

    yield fork(externalListener, socketChannel);
    yield fork(internalListener, payload.socket);

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

    yield put(actionSocketMessageSend({ command: USER, data: { userId } }));
    yield put(actionSocketMessageSend({ command: USERS }));
    yield put(actionSocketMessageSend({ command: GROUPS }));

    yield take([USER_GET_SUCCESS, USERS_GET_SUCCESS, GROUPS_GET_SUCCESS]);
    yield put(actionAppFinishInit());
  } catch (e) {
    console.error(e);
  }
}

function* receiveMessages(action) {
  const {
    payload: { command, data },
  } = action;

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
    case 'rooms': {
      yield put(actionGroupsGetSuccess({ data }));
      break;
    }
    // case 'roomMessagesById': {
    //   yield put(actionGroupMessagesGetSuccess({ data }));
    //   break;
    // }
    // case 'message': {
    //   yield put(actionGroupMessageReceive({ data }));
    //   break;
    // }
    // case 'onlineUsers': {
    //   yield put(actionOnlineUsers({ data }));
    //   break;
    // }
  }
}

export function* appSaga() {
  yield takeLatest(APP_START_INIT, handleAppStartInit);
  yield takeLatest(INIT_SOCKET, handleSocketInit);
  yield takeLatest(SOCKET_CONNECT, handleSocketManager);
  yield takeLatest(SOCKET_OPEN, handleGetInitialData);
  yield takeLatest(SOCKET_MESSAGE_RECEIVE, receiveMessages);
}
