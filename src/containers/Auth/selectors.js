import { createSelector } from 'reselect';

import { initialState } from './authReducer';

const selectAuthDomain = (state) => state.auth || initialState;
export const selectIsAuth = createSelector(selectAuthDomain, (auth) => auth.isAuth);
export const selectIsLogOut = createSelector(selectAuthDomain, (auth) => auth.isLogOut);
export const selectIsAuthError = createSelector(selectAuthDomain, (auth) => auth.isAuthError);
export const selectUserAuthData = createSelector(selectAuthDomain, (auth) => auth.userAuthData);
