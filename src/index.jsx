import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware } from 'redux';
import { Provider, ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import {
  createInjectorsEnhancer,
  forceReducerReload,
  useInjectReducer,
  useInjectSaga,
} from 'redux-injectors';
import { useSessionStorage } from 'react-use';

import { actionAppStartInit } from './containers/App/actions';
import { actionUserIsAuthSet } from './containers/Auth/actions';
import { storeCreator, history, getStoreReducers } from './utils';
import { App } from './containers/App/App';
import { NotFoundPage } from './containers/NotFoundPage/NotFoundPage';
import { ThemeProvider } from './ThemeProvider';
import { appReducer } from './containers/App/appReducer';
import { appSaga } from './containers/App/appSaga';
import { AuthRoot } from './containers/Auth';
import { selectIsLogOut } from './containers/Auth/selectors';
import { authReducer } from './containers/Auth/authReducer';
import { authSaga } from './containers/Auth/authSaga';

const ref = {
  modules: null,
  store: null,
};

/*
 * создание стора разобраться позже
 * */
if (module.hot && module.hot.data && module.hot.data.store) {
  ref.store = module.hot.data.store;
  forceReducerReload(ref.store);
} else {
  const sagaMiddleware = createSagaMiddleware();

  const enhancers = [
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    createInjectorsEnhancer({ createReducer: getStoreReducers, runSaga: sagaMiddleware.run }),
  ];

  ref.store = storeCreator({
    reducer: getStoreReducers(),
    middleware: [],
    enhancers,
  });
}

// ищим елемент в дом дереве
const MOUNT_NODE = document.getElementById('root');

const appKey = 'app';
const authKey = 'auth';

const AppInit = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: authKey, reducer: authReducer });
  useInjectSaga({ key: authKey, saga: authSaga });
  useInjectReducer({ key: appKey, reducer: appReducer });
  useInjectSaga({ key: appKey, saga: appSaga });

  const [userAuthData] = useSessionStorage('userAuthData');
  const isLogOut = useSelector(selectIsLogOut);

  if (userAuthData && !isLogOut) {
    dispatch(actionUserIsAuthSet({ isAuth: true, userAuthData }));
    dispatch(actionAppStartInit());
  }

  return (
    <Switch>
      <Route path={['/sign-in', '/sign-up', '/confirm-mail']} component={AuthRoot} />
      <Route path="/" component={App} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const ConnectedApp = () => {
  return (
    <ThemeProvider>
      <Provider store={ref.store} context={ReactReduxContext}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
          <AppInit />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  );
};

// монтирование приложения в рутовую ноду
ReactDOM.render(<ConnectedApp />, MOUNT_NODE);
