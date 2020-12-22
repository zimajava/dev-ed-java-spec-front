import React, { useState, useEffect, useCallback } from 'react';
import { Box, Toolbar, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { selectGroups, selectCurrentUser, selectCurrentGroupMessages } from '../App/selectors';
import { Messenger } from '../../components';
import { actionSocketMessageSend } from '../App/actions';
import { SOCKET_COMMANDS } from '../App/constants';

const { GROUP_JOIN, MESSAGE_ADD, GROUP_CREATE } = SOCKET_COMMANDS;

export const Groups = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const rooms = useSelector(selectGroups);
  const messages = useSelector(selectCurrentGroupMessages);

  const [currentConversation, setCurrentConversation] = useState(null);

  useEffect(() => {
    return () => {
      setCurrentConversation(null);
    };
  }, []);

  useEffect(() => {
    if (currentConversation) {
      dispatch(
        actionSocketMessageSend({
          event: GROUP_JOIN,
          data: { roomId: currentConversation._id, userId: currentUser._id },
        }),
      );
    } else if (rooms && rooms.length && Object.keys(currentUser).length) {
      setCurrentConversation(rooms.find((room) => room._id === currentUser.room._id) || rooms[0]);
    }
  }, [dispatch, currentConversation, currentUser, rooms]);

  const handleSendMessage = useCallback(
    (message) => {
      dispatch(
        actionSocketMessageSend({
          event: MESSAGE_ADD,
          data: { text: message, timestamp: new Date() },
        }),
      );
    },
    [dispatch],
  );
  const handleCreateGroup = useCallback(
    ({ name, description }) => {
      dispatch(
        actionSocketMessageSend({
          event: GROUP_CREATE,
          data: { name, description },
        }),
      );
    },
    [dispatch],
  );

  return (
    <Box>
      <Toolbar />
      {currentConversation ? (
        <Messenger
          title="Groups"
          isCreateConversation
          userId={currentUser._id}
          rooms={rooms}
          messages={messages}
          currentConversation={currentConversation}
          // isShowJoinButton={isShowJoinButton}
          handleChangeGroup={setCurrentConversation}
          handleSendMessage={handleSendMessage}
          handleCreateGroup={handleCreateGroup}
        />
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
