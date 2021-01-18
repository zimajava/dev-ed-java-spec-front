import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box } from '@material-ui/core';

import { ConversationList } from './ConversationList';
import { MessageList } from './MessageList';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'grid',
      width: '100%',
      height: 'calc(100vh - 112px)',
      background: theme.palette.background.default,
      gridTemplateColumns: '250px auto',
      gridTemplateRows: '60px auto 60px',
      gridColumnGap: '1px',
      gridRowGap: '1px',
    },
    sidebar: {
      background: theme.palette.background.paper,
      gridRowStart: 1,
      gridRowEnd: 'span 3',
    },
    content: {
      background: theme.palette.background.paper,
      gridRowStart: 1,
      gridRowEnd: 'span 3',
    },
  };
});

export const Messenger = (props) => {
  const {
    title,
    userId,
    rooms = [],
    messages = [],
    currentConversation,
    isShowJoinButton = false,
    isCreateConversation,
    handleChangeGroup,
    handleSendMessage,
    handleSubscribeGroup,
    handleCreateGroup,
  } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <div className={classes.sidebar}>
        <ConversationList
          title={title}
          rooms={rooms}
          currentConversation={currentConversation}
          isCreateConversation={isCreateConversation}
          handleChangeGroup={handleChangeGroup}
          handleCreateGroup={handleCreateGroup}
        />
      </div>
      <div className={classes.content}>
        <MessageList
          userId={userId}
          messages={messages}
          isShowJoinButton={isShowJoinButton}
          handleSendMessage={handleSendMessage}
          handleSubscribeGroup={handleSubscribeGroup}
        />
      </div>
    </Box>
  );
};

Messenger.propTypes = {
  title: PropTypes.string,
  userId: PropTypes.string.isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      chatName: PropTypes.string.isRequired,
      creatorUserId: PropTypes.string.isRequired,
      isOnline: PropTypes.bool,
      idUsers: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      user: PropTypes.string,
      timestamp: PropTypes.string,
    }),
  ).isRequired,
  currentConversation: PropTypes.object,
  isShowJoinButton: PropTypes.bool,
  isCreateConversation: PropTypes.bool,
  handleChangeGroup: PropTypes.func,
  handleSendMessage: PropTypes.func,
  handleSubscribeGroup: PropTypes.func,
  handleCreateGroup: PropTypes.func,
};
