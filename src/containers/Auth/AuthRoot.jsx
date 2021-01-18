import React from 'react';
import { Switch, Route } from 'react-router';

import { AuthRoute } from '../../router';
import { useAuthBase } from '../../hooks';
import { actionAppStartInit } from '../App/actions';
import { SignIn, SignUp, ConfirmMail } from './components';

export const AuthRoot = () => {
  return (
    <Switch>
      <AuthRoute
        exact
        path="/sign-up"
        redirectPath="/conversations"
        useAuthBase={useAuthBase}
        actionAppStartInit={actionAppStartInit}
        component={SignUp}
      />
      <AuthRoute
        exact
        path="/sign-in"
        redirectPath="/conversations"
        useAuthBase={useAuthBase}
        actionAppStartInit={actionAppStartInit}
        component={SignIn}
      />
      <Route
        exact
        path="/confirm-mail"
        // redirectPath="/sign-in"
        // useAuthBase={useAuthBase}
        // actionAppStartInit={actionAppStartInit}
        component={ConfirmMail}
      />
    </Switch>
  );
};
