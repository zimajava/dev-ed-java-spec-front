import {
  USER_AUTH_REQUEST,
  USER_AUTH_ERROR,
  USER_IS_AUTH_SET,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  APP_LOG_OUT,
  CONFIRM_MAIL_REQUEST,
  CONFIRM_MAIL_SUCCESS,
  CONFIRM_MAIL_ERROR,
} from './constants';

export const actionUserAuthRequest = (payload) => ({ type: USER_AUTH_REQUEST, payload });
export const actionUserAuthError = () => ({ type: USER_AUTH_ERROR });
export const actionUserIsAuthSet = (payload) => ({ type: USER_IS_AUTH_SET, payload });

export const actionUserRegisterRequest = (payload) => ({ type: USER_REGISTER_REQUEST, payload });
export const actionUserRegisterSuccess = () => ({ type: USER_REGISTER_SUCCESS });
export const actionUserRegisterError = () => ({ type: USER_REGISTER_ERROR });

export const actionConfirmMailRequest = (payload) => ({ type: CONFIRM_MAIL_REQUEST, payload });
export const actionConfirmMailSuccess = () => ({ type: CONFIRM_MAIL_SUCCESS });
export const actionConfirmMailError = () => ({ type: CONFIRM_MAIL_ERROR });

export const actionAppLogOut = () => ({ type: APP_LOG_OUT });
