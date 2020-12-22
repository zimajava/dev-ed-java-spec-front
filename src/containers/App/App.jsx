import React, { useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { push } from 'connected-react-router';
import { Box } from '@material-ui/core';
import { useSessionStorage } from 'react-use';

import { RouteWithCheckAuth } from '../../router';
import { useAuthBase } from '../../hooks';
import { Menu } from '../../components';
import { People } from '../People/People';
import { Groups } from '../Groups/Groups';
import { About } from '../About/About';
import { selectCurrentUser } from './selectors';
import { actionAppLogOut } from '../Auth/actions';
import { selectIsLogOut, selectUserAuthData } from '../Auth/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser, shallowEqual);
  const userAuthData = useSelector(selectUserAuthData);

  const [value, setValue] = useSessionStorage('userAuthData');
  const isLogOut = useSelector(selectIsLogOut);

  useEffect(() => {
    if (isLogOut) {
      dispatch(push('/sign-in'));
    } else if (!value && !isLogOut) {
      setValue(() => userAuthData);
    }
  }, [dispatch, isLogOut, setValue, userAuthData, value]);

  return (
    <Box>
      <Menu
        title={currentUser.name}
        handleLogOut={() => {
          setValue(() => undefined);
          dispatch(actionAppLogOut());
        }}
      >
        <Switch>
          <RouteWithCheckAuth
            exact
            path="/people"
            redirectPath="/sign-in"
            useAuthBase={useAuthBase}
            component={People}
          />
          <RouteWithCheckAuth
            exact
            path="/channels"
            redirectPath="/sign-in"
            useAuthBase={useAuthBase}
            component={Groups}
          />
          <RouteWithCheckAuth
            exact
            path="/about"
            redirectPath="/sign-in"
            useAuthBase={useAuthBase}
            component={About}
          />
          <Route component={() => <Redirect to={{ pathname: '/people' }} />} />
        </Switch>
      </Menu>
    </Box>
  );
};
