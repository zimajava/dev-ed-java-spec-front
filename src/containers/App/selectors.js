import { createSelector } from 'reselect';

import { initialState } from './appReducer';

export const selectAppDomain = (state) => state.app || initialState;
export const selectRouter = (state) => state.router;

export const selectIsReady = createSelector(selectAppDomain, (app) => app.isReady);
export const selectCurrentUser = createSelector(selectAppDomain, (app) => app.currentUser);
export const selectUsers = createSelector(selectAppDomain, (app) => app.users);
export const selectReformattedUsers = createSelector(
  selectAppDomain,
  (app) => app.reformattedUsers,
);
export const selectCurrentRoomMessages = createSelector(
  selectAppDomain,
  (app) => app.currentRoomMessages,
);
export const selectRooms = createSelector(selectAppDomain, (app) => app.rooms);
export const selectOnlineUsers = createSelector(selectAppDomain, (app) => app.onlineUsers);
