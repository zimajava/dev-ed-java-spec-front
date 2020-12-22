import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Toolbar } from '@material-ui/core';

import { Messenger } from '../../components';
import {
  selectUsers,
  selectGroups,
  selectCurrentUser,
  selectCurrentGroupMessages,
  selectOnlineUsers,
} from '../App/selectors';
import { actionSocketMessageSend } from '../App/actions';
import { SOCKET_COMMANDS } from '../App/constants';

const { GROUP_JOIN, MESSAGE_ADD } = SOCKET_COMMANDS;

export const People = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const users = useSelector(selectUsers);
  const rooms = useSelector(selectGroups);
  const messages = useSelector(selectCurrentGroupMessages);
  const onlineUsers = useSelector(selectOnlineUsers);

  const [filteredUsers, setFilteredUsers] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [filteredGroups, setFilteredGroups] = useState(null);

  useEffect(() => {
    return () => {
      setCurrentConversation(null);
    };
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users
        .filter((user) => user._id !== currentUser._id)
        .map((user) => {
          user.isOnline = !!onlineUsers.includes(user._id);
          return user;
        }),
    );
  }, [currentUser, users, onlineUsers]);

  useEffect(() => {
    setFilteredGroups(rooms.filter((room) => room.is_user));
  }, [rooms]);

  useEffect(() => {
    if (currentConversation) {
      dispatch(
        actionSocketMessageSend({
          event: GROUP_JOIN,
          data: { roomId: currentConversation._id, userId: currentUser._id },
        }),
      );
    } else if (filteredGroups && filteredGroups.length) {
      setCurrentConversation(filteredGroups[0]);
    }
  }, [dispatch, currentConversation, filteredGroups, currentUser]);

  const handleSendMessage = useCallback(
    (message) =>
      dispatch(
        actionSocketMessageSend({
          event: MESSAGE_ADD,
          data: {
            text: message,
            timestamp: new Date(),
          },
        }),
      ),
    [dispatch, currentUser, currentConversation],
  );

  return (
    <div>
      <Toolbar />
      {currentConversation ? (
        <Messenger
          title="People"
          userId={currentUser._id}
          rooms={filteredUsers}
          messages={messages}
          currentConversation={currentConversation}
          handleChangeGroup={setCurrentConversation}
          handleSendMessage={handleSendMessage}
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
