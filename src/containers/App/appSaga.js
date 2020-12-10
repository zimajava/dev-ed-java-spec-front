import { put, takeLatest, call, select, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';

import { IO_BASE } from '../../config';
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
  MEMBERS_GET_SUCCESS,
  CHANNELS_GET_SUCCESS,
  SOCKET_COMMANDS,
} from './constants';
import {
  actionAppFinishInit,
  actionInitSocket,
  actionSocketConnect,
  actionSocketOpen,
  actionSocketError,
  actionSocketMessageSend,
  actionUserGetSuccess,
  actionMembersGetSuccess,
  actionChannelsGetSuccess,
  actionNewChannel,
  actionMessagesGetSuccess,
  actionMessageReceive,
  actionMembersOnline,
} from './actions';

const {
  MEMBER,
  // MEMBER_EDIT,
  MEMBERS,
  MEMBERS_ONLINE,
  CHANNEL_CREATE,
  CHANNELS,
  ROOM_JOIN,
  // ROOM_LEAVE,
  // EDITOR_TYPING,
  // EDITOR_STOP_TYPING,
  MESSAGE_ADD,
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
    const socket = io(IO_BASE, { query: { token: payload.token } });
    socket.on();
    yield put(actionSocketConnect({ socket }));
  } catch (e) {
    console.error(e);
  }
}

function watchMessage(socket) {
  return eventChannel((emitter) => {
    socket.on('connect', (event) => emitter(actionSocketOpen(event)));
    socket.on('error', (event) => emitter(actionSocketError(event)));
    socket.on(MEMBER, (data) => {
      if (!data) {
        emitter(actionAppLogOut());
      }

      emitter(actionUserGetSuccess({ data }));
    });
    socket.on(MEMBERS_ONLINE, (data) => emitter(actionMembersOnline({ data })));
    socket.on(MEMBERS, (data) => emitter(actionMembersGetSuccess({ data })));
    socket.on(CHANNELS, (data) => emitter(actionChannelsGetSuccess({ data })));
    socket.on(ROOM_JOIN, (data) => emitter(actionMessagesGetSuccess({ data })));
    socket.on(MESSAGE_ADD, (data) => emitter(actionMessageReceive({ data })));
    socket.on(CHANNEL_CREATE, (data) => emitter(actionNewChannel({ data })));

    return () => {
      socket.close();
    };
  });
}

function* internalListener(socket) {
  try {
    while (true) {
      const { payload } = yield take(SOCKET_MESSAGE_SEND);

      socket.emit(payload.event, payload.data);
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

    yield put(actionSocketMessageSend({ event: MEMBER, data: { userId } }));
    yield put(actionSocketMessageSend({ event: MEMBERS }));
    yield put(actionSocketMessageSend({ event: CHANNELS }));

    yield take([USER_GET_SUCCESS, MEMBERS_GET_SUCCESS, CHANNELS_GET_SUCCESS]);
    yield put(actionAppFinishInit());
  } catch (e) {
    console.error(e);
  }
}

export function* appSaga() {
  yield takeLatest(APP_START_INIT, handleAppStartInit);
  yield takeLatest(INIT_SOCKET, handleSocketInit);
  yield takeLatest(SOCKET_CONNECT, handleSocketManager);
  yield takeLatest(SOCKET_OPEN, handleGetInitialData);
}
