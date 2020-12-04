import { USER_AUTH_ERROR, USER_IS_AUTH_SET, APP_LOG_OUT } from './constants';

export const initialState = {
  isAuth: false,
  isAuthError: false,
  userAuthData: null,
  isLogOut: false,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_IS_AUTH_SET: {
      const { isAuth, userAuthData } = payload;

      return { ...state, isAuth, userAuthData, isLogOut: false };
    }
    case USER_AUTH_ERROR: {
      const { isAuthError } = payload;

      return { ...state, isAuthError };
    }
    case APP_LOG_OUT: {
      return { ...state, isAuth: false, isAuthError: false, userAuthData: null, isLogOut: true };
    }
    default:
      return state;
  }
};
