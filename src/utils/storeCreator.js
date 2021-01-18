import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

import { isPlainObject } from './isPlainObject';

const logger = createLogger({});

export function storeCreator(options = {}) {
  const {
    reducer = undefined,
    middleware = [],
    devTools = process.env.NODE_ENV !== 'production',
    preloadedState = undefined,
    enhancers = undefined,
  } = options;

  let rootReducer;

  if (typeof reducer === 'function') {
    rootReducer = reducer;
  } else if (isPlainObject(reducer)) {
    rootReducer = combineReducers(reducer);
  } else {
    throw new Error(
      '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers',
    );
  }

  const middlewareEnhancer = applyMiddleware(...middleware, logger);

  let finalCompose = compose;

  if (devTools) {
    // eslint-disable-next-line global-require
    const { composeWithDevTools } = require('redux-devtools-extension');
    finalCompose = composeWithDevTools({
      // Enable capture of stack traces for dispatched Redux actions
      trace: process.env.NODE_ENV !== 'production',
      ...(typeof devTools === 'object' && devTools),
    });
  }

  let storeEnhancers = [middlewareEnhancer];

  if (Array.isArray(enhancers)) {
    storeEnhancers = [middlewareEnhancer, ...enhancers];
  } else if (typeof enhancers === 'function') {
    storeEnhancers = enhancers(storeEnhancers);
  }

  const composedEnhancer = finalCompose(...storeEnhancers);

  return createStore(rootReducer, preloadedState, composedEnhancer);
}
