import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { history } from './history';

export const getStoreReducers = (injectedReducers = {}) =>
  combineReducers({
    router: connectRouter(history),
    ...injectedReducers,
  });
