import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import { Route } from 'react-router';

import { RenderComponent } from './RenderComponent';

export const RouteWithCheckAuth = memo((props) => {
  const { redirectPath = '/sign-in', component, useAuthBase, ...rest } = props;

  const { isReady, isAuth, currentUser, Spinner } = useAuthBase();

  const isLoading = !isReady && isAuth;
  const isRedirect = !isAuth && isEmpty(currentUser);

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
});

RouteWithCheckAuth.propTypes = {
  path: PropTypes.string.isRequired,
  redirectPath: PropTypes.string,
  exact: PropTypes.bool,
  useAuthBase: PropTypes.func.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]).isRequired,
};
