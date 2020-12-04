import React, { useState, useEffect, useCallback } from 'react';
import { Box, Toolbar, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { selectRooms, selectCurrentUser, selectCurrentRoomMessages } from '../App/selectors';
import { Messenger } from '../../components';
import { actionSocketMessageSend } from '../App/actions';
import { SOCKET_COMMANDS } from '../App/constants';

const { ROOM_JOIN, MESSAGE_ADD, CHANNEL_CREATE } = SOCKET_COMMANDS;

export const Channels = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const rooms = useSelector(selectRooms);
  const messages = useSelector(selectCurrentRoomMessages);

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
          event: ROOM_JOIN,
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
  const handleCreateChannel = useCallback(
    ({ name, description }) => {
      dispatch(
        actionSocketMessageSend({
          event: CHANNEL_CREATE,
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
          title="Channels"
          isCreateConversation
          userId={currentUser._id}
          rooms={rooms}
          messages={messages}
          currentConversation={currentConversation}
          // isShowJoinButton={isShowJoinButton}
          handleChangeRoom={setCurrentConversation}
          handleSendMessage={handleSendMessage}
          handleCreateChannel={handleCreateChannel}
        />
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
