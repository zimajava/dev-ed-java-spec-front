import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'ramda';

import { RenderComponent } from './RenderComponent';

export const AuthRoute = (props) => {
  const {
    redirectPath = '/people',
    redirectOnLoggedIn = true,
    component,
    useAuthBase,
    actionAppStartInit,
    ...rest
  } = props;

  const { isReady, isAuth, currentUser, Spinner } = useAuthBase();

  const dispatch = useDispatch();

  if (!isReady && isEmpty(currentUser) && isAuth) {
    dispatch(actionAppStartInit());
  }

  const isLoading = !isReady && isAuth;
  const isRedirect = isReady && isAuth && redirectOnLoggedIn;

  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <RenderComponent
          isLoading={isLoading}
          isRedirect={isRedirect}
          redirectPath={redirectPath}
          component={component}
          Spinner={Spinner}
          {...routeProps}
        />
      )}
    />
  );
};

AuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  redirectPath: PropTypes.string,
  exact: PropTypes.bool,
  redirectOnLoggedIn: PropTypes.bool,
  useAuthBase: PropTypes.func.isRequired,
  actionAppStartInit: PropTypes.func.isRequired,
  component: PropTypes.any.isRequired,
};
