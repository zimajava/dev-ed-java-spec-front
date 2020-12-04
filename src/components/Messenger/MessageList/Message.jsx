import React from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  timestamp: {
    display: 'flex',
    justifyContent: 'center',
    color: '#999',
    fontWeight: 600,
    fontSize: '12px',
    margin: '10px 0px',
    textTransform: 'uppercase',
  },
  container: {
    fontSize: '14px',
    display: 'flex',
  },
  mineContainer: {
    justifyContent: 'flex-end',
  },
  bubble: {
    margin: '1px 0px',
    background: '#f4f4f8',
    padding: '5px 10px',
    maxWidth: '75%',
    borderRadius: '2px 20px 20px 2px',
    display: 'flex',
    flexDirection: 'column',
  },
  bubbleSender: {
    paddingBottom: '5px',
    textAlign: 'left',
    fontSize: '10px',
  },
  bubbleMessage: {},
  bubbleTime: {
    paddingTop: '5px',
    textAlign: 'right',
    fontSize: '10px',
  },
  bubbleStart: {
    borderTopLeftRadius: '20px',
  },
  bubbleEnd: {
    borderBottomLeftRadius: '20px',
  },
  bubbleMine: {
    background: '#007aff',
    color: 'white',
    borderRadius: '20px 2px 2px 20px',
  },
  bubbleMineStart: {
    marginTop: '10px',
    borderTopRightRadius: '20px',
  },
  bubbleMineEnd: {
    borderBottomRightRadius: '20px',
    marginBottom: '10px',
  },
}));

export function Message(props) {
  const { data, isMine, startsSequence, endsSequence, showTimestamp } = props;
  const { timestamp, text, sender } = data;
  const classes = useStyles();

  const friendlyTimestamp = moment(timestamp).format('LLLL');
  const time = moment(timestamp).format('hh:mm');

  return (
    <div className={classes.root}>
      {showTimestamp && <div className={classes.timestamp}>{friendlyTimestamp}</div>}
      <div className={clsx(classes.container, { [classes.mineContainer]: isMine })}>
        <div
          className={clsx(
            classes.bubble,
            { [classes.bubbleStart]: startsSequence },
            { [classes.bubbleEnd]: endsSequence },
            { [classes.bubbleMine]: isMine },
            { [classes.bubbleMineStart]: isMine && startsSequence },
            { [classes.bubbleMineEnd]: isMine && endsSequence },
          )}
          title={friendlyTimestamp}
        >
          <div className={classes.bubbleSender}>{isMine ? '' : sender.username}</div>
          <div className={classes.bubbleMessage}>{text}</div>
          <div className={classes.bubbleTime}>{time}</div>
        </div>
      </div>
    </div>
  );
}
