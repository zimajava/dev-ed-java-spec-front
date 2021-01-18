import React, { useState, useEffect, useCallback } from 'react';
import { Box, Toolbar, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { selectGroups, selectCurrentUser, selectCurrentGroupMessages } from '../App/selectors';
import { Messenger } from '../../components';
import { actionSocketMessageSend } from '../App/actions';
import { SOCKET_COMMANDS } from '../App/constants';

const { CHAT_GROUP_CREATE, MESSAGE_SEND, CHAT_JOIN } = SOCKET_COMMANDS;

export function Conversations(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const rooms = useSelector(selectGroups);
  const messages = useSelector(selectCurrentGroupMessages);

  const [currentConversation, setCurrentConversation] = useState({});

  useEffect(() => {
    return () => {
      setCurrentConversation(null);
    };
  }, []);

  useEffect(() => {
    if (currentConversation.length) {
      dispatch(
        actionSocketMessageSend({
          command: CHAT_JOIN,
          data: { roomId: currentConversation.id, userId: currentUser.id },
        }),
      );
    } else if (rooms && rooms.length && Object.keys(currentUser).length) {
      setCurrentConversation(rooms.find((room) => room.id === currentUser.id) || rooms[0]);
    }
  }, [dispatch, currentConversation, currentUser, rooms]);

  const handleSendMessage = useCallback(
    (message) => {
      dispatch(
        actionSocketMessageSend({
          command: MESSAGE_SEND,
          data: {
            messageId: '',
            textMessage: message,
            idUser: currentUser.id,
            idChat: currentConversation.id,
          },
        }),
      );
    },
    [currentConversation, currentUser.id, dispatch],
  );
  const handleCreateGroup = useCallback(
    ({ name }) => {
      dispatch(
        actionSocketMessageSend({
          command: CHAT_GROUP_CREATE,
          data: {
            chatName: name,
            groupUsersIds: '',
            idUser: currentUser.id,
            idChat: '',
          },
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
          userId={currentUser.id}
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
}

Conversations.propTypes = {};
Conversations.defaultProps = {};
