import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';

import { API_BASE } from '../../config';
import { USER_AUTH_REQUEST, USER_REGISTER_REQUEST } from './constants';
import {
  actionUserIsAuthSet,
  // actionUserRegisterSuccess
} from './actions';

function* handleAuth(action) {
  const { payload } = action;

  const requestURL = `${API_BASE}/api/auth/login`;

  try {
    const userAuthData = yield axios.post(requestURL, payload).then((response) => response.data);

    yield put(actionUserIsAuthSet({ isAuth: true, userAuthData }));
  } catch (e) {
    console.error(e);
  }
}

function* handleRegister(action) {
  const { payload } = action;

  const requestURL = `${API_BASE}/api/auth/registration`;

  try {
    yield axios.post(requestURL, payload).then((response) => response.data);

    yield put(push('/sign-in'));
  } catch (e) {
    console.error(e);
  }
}

export function* authSaga() {
  yield takeLatest(USER_AUTH_REQUEST, handleAuth);
  yield takeLatest(USER_REGISTER_REQUEST, handleRegister);
}
