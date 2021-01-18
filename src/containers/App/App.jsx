import React, { useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { push } from 'connected-react-router';
import { Box } from '@material-ui/core';
import { useSessionStorage } from 'react-use';

import { RouteWithCheckAuth } from '../../router';
import { useAuthBase } from '../../hooks';
import { Menu } from '../../components';
import { Conversations } from '../Conversations/Conversations';
import { selectCurrentUser } from './selectors';
import { actionAppLogOut } from '../Auth/actions';
import { selectIsLogOut } from '../Auth/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser, shallowEqual);

  const [, setValue] = useSessionStorage('userAuthData');
  const isLogOut = useSelector(selectIsLogOut);

  useEffect(() => {
    if (isLogOut) {
      dispatch(push('/sign-in'));
    }
  }, [dispatch, isLogOut]);

  return (
    <Box>
      <Menu
        title={currentUser.userName}
        avatarSrc={currentUser.avatar}
        handleLogOut={() => {
          setValue(() => undefined);
          dispatch(actionAppLogOut());
        }}
      />
      <Switch>
        <RouteWithCheckAuth
          exact
          path="/conversations"
          redirectPath="/sign-in"
          useAuthBase={useAuthBase}
          component={Conversations}
        />
        <Route component={() => <Redirect to={{ pathname: '/conversations' }} />} />
      </Switch>
    </Box>
  );
};
