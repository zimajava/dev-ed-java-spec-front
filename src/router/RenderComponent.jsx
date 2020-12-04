import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Case, Default, Switch } from 'react-if';
import { Redirect, useLocation } from 'react-router';

export const RenderComponent = memo((props) => {
  const { isLoading, isRedirect, redirectPath, component: Component, Spinner, ...rest } = props;

  const { search } = useLocation();

  return (
    <Switch>
      <Case condition={isLoading}>
        <Spinner />
      </Case>
      <Case condition={isRedirect}>
        <Redirect to={{ pathname: redirectPath, search }} />
      </Case>
      <Default>
        <Component {...rest} />
      </Default>
    </Switch>
  );
});

RenderComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isRedirect: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string.isRequired,
  component: PropTypes.any.isRequired,
  Spinner: PropTypes.any.isRequired,
};
