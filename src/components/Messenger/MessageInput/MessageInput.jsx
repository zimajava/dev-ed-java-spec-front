import React, { Children, cloneElement, useState, useCallback } from 'react';
import { makeStyles, Button, Input } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    bottom: '-1px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
  },
  input: {
    flex: 1,
    padding: '8px 10px',
    fontSize: '14px',
    height: '40px',
    background: 'none',
    '&::placeholder': {
      opacity: 0.3,
    },
  },
  inputBlock: {
    display: 'flex',
    flex: 1,
  },
  items: {
    padding: '10px',
    display: 'flex',
  },
  rightItems: {
    flexDirection: 'row-reverse',
  },
}));

// const handleInputKeyDown = (event, inputRef) => {
//   if (event.keyCode === 13) {
//     if (event.ctrlKey) {
//       inputRef.value += '\n';
//     } else {
//       event.preventDefault();
//
//       if (!inputRef.value) {
//         return;
//       }
//
//       const { receiver } = store.getState();
//       let value = escape(inputRef.value);
//
//       value = value.replace(/\r?\n/g, '<br>');
//       this.io.emit('editor:stop-typing', receiver);
//       this.io.emit('message:add', value, receiver);
//       inputRef.value = '';
//     }
//   }
// };

export function MessageInput(props) {
  const { userId, handleSendMessage, leftItems, rightItems } = props;
  const classes = useStyles();
  const [message, setMessage] = useState('');

  const sendMessage = useCallback(() => {
    if (message) {
      handleSendMessage(message);
      setMessage('');
    }
  }, [handleSendMessage, message, userId]);

  return (
    <div className={classes.root}>
      <div className={classes.items}>
        {Children.map(leftItems, (item) => cloneElement(item, { composeLeft: true }))}
      </div>
      <div className={classes.inputBlock}>
        <Input
          className={classes.input}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message, @name"
        />
        <Button variant="outlined" onClick={sendMessage}>
          Send
        </Button>
      </div>
      <div className={`${classes.items} ${classes.rightItems}`}>
        {Children.map(rightItems, (item) => cloneElement(item, { composeRight: true }))}
      </div>
    </div>
  );
}
