import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';

import { API_BASE } from '../../config';
import { USER_AUTH_REQUEST, USER_REGISTER_REQUEST, CONFIRM_MAIL_REQUEST } from './constants';
import {
  actionUserIsAuthSet,
  // actionUserRegisterSuccess
} from './actions';

function* handleAuth(action) {
  const { payload } = action;

  const requestURL = `${API_BASE}/zipli/auth/signin`;

  try {
    const userAuthData = yield axios.post(requestURL, payload).then((response) => response.data);

    window.sessionStorage.setItem('userAuthData', JSON.stringify(userAuthData));

    yield put(actionUserIsAuthSet({ isAuth: true, userAuthData }));
  } catch (e) {
    console.error(e);
  }
}

function* handleRegister(action) {
  const { payload } = action;

  const requestURL = `${API_BASE}/zipli/auth/signup`;

  try {
    yield axios.post(requestURL, payload).then((response) => response.data);

    yield put(push('/sign-in'));
  } catch (e) {
    console.error(e);
  }
}

function* handleConfirmMail(action) {
  const { payload } = action;

  const requestURL = `${API_BASE}/zipli/auth/confirm-mail?token=${payload.token}`;

  try {
    yield axios
      .post(requestURL, { token: payload.token })
      // eslint-disable-next-line no-console
      .then((response) => console.log(response.data));

    yield put(push('/sign-in'));
  } catch (e) {
    console.error(e);
  }
}

export function* authSaga() {
  yield takeLatest(USER_AUTH_REQUEST, handleAuth);
  yield takeLatest(USER_REGISTER_REQUEST, handleRegister);
  yield takeLatest(CONFIRM_MAIL_REQUEST, handleConfirmMail);
}
