import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom';

import { MessageInput } from '../MessageInput/MessageInput';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarButton } from '../Toolbar/ToolbarButton';
import { Message } from './Message';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 120px)',
  },
  list: {
    flex: 1,
    padding: '10px 10px 10px',
  },
  scrollable: {
    position: 'relative',
    overflowY: 'scroll',
    '-webkit-overflow-scrolling': 'touch',
  },
}));

const renderMessages = (userId, messages) => {
  let i = 0;
  const messageCount = messages.length;
  const tempMessages = [];

  while (i < messageCount) {
    const previous = messages[i - 1];
    const current = messages[i];
    const next = messages[i + 1];
    const isMine = current.sender.id === userId;
    const currentMoment = moment(new Date(current.timestamp).getTime());
    let prevBySameAuthor = false;
    let nextBySameAuthor = false;
    let startsSequence = true;
    let endsSequence = true;
    let showTimestamp = true;

    if (previous) {
      const previousMoment = moment(new Date(previous.timestamp).getTime());
      const previousDuration = moment.duration(currentMoment.diff(previousMoment));
      prevBySameAuthor = previous.sender.id === current.sender.id;

      if (prevBySameAuthor && previousDuration.as('hours') < 1) {
        startsSequence = false;
      }

      if (previousDuration.as('hours') < 1) {
        showTimestamp = false;
      }
    }

    if (next) {
      const nextMoment = moment(new Date(next.timestamp).getTime());
      const nextDuration = moment.duration(nextMoment.diff(currentMoment));
      nextBySameAuthor = next.sender.id === current.sender.id;

      if (nextBySameAuthor && nextDuration.as('hours') < 1) {
        endsSequence = false;
      }
    }

    tempMessages.push(
      <Message
        key={i}
        isMine={isMine}
        startsSequence={startsSequence}
        endsSequence={endsSequence}
        showTimestamp={showTimestamp}
        data={current}
      />,
    );

    // Proceed to the next message.
    i += 1;
  }

  return tempMessages;
};

export function MessageList(props) {
  const { userId, messages, isShowJoinButton, handleSendMessage, handleSubscribeGroup } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar
        title="Conversation Title"
        rightItems={[
          <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />,
        ]}
      />
      <ScrollToBottom className={`${classes.list} ${classes.scrollable}`}>
        {renderMessages(userId, messages)}
      </ScrollToBottom>
      {isShowJoinButton && (
        <Button variant="outlined" onClick={handleSubscribeGroup}>
          Subscribe
        </Button>
      )}
      <MessageInput
        userId={userId}
        handleSendMessage={handleSendMessage}
        rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />,
        ]}
      />
    </div>
  );
}
