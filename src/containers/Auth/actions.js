import {
  USER_AUTH_REQUEST,
  USER_AUTH_ERROR,
  USER_IS_AUTH_SET,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  APP_LOG_OUT,
} from './constants';

export const actionUserAuthRequest = (payload) => ({ type: USER_AUTH_REQUEST, payload });
export const actionUserAuthError = () => ({ type: USER_AUTH_ERROR });
export const actionUserIsAuthSet = (payload) => ({ type: USER_IS_AUTH_SET, payload });

export const actionUserRegisterRequest = (payload) => ({ type: USER_REGISTER_REQUEST, payload });
export const actionUserRegisterSuccess = () => ({ type: USER_REGISTER_SUCCESS });
export const actionUserRegisterError = () => ({ type: USER_REGISTER_ERROR });

export const actionAppLogOut = () => ({ type: APP_LOG_OUT });
