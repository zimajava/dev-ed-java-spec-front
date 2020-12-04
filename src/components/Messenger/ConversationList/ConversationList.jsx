import React, { useState } from 'react';
import {
  makeStyles,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { ConversationSearch } from './ConversationSearch';
import { ConversationListItem } from './ConversationListItem';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarButton } from '../Toolbar/ToolbarButton';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 112px)',
  },
  scrollable: {
    position: 'relative',
    overflowY: 'scroll',
    '-webkit-overflow-scrolling': 'touch',
  },
}));

export function ConversationList(props) {
  const {
    title,
    rooms,
    currentConversation,
    isCreateConversation,
    handleChangeRoom,
    handleCreateChannel,
  } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Toolbar
        title={title}
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={
          isCreateConversation
            ? [
                <ToolbarButton
                  key="add"
                  icon="ion-ios-add-circle-outline"
                  handleClick={handleClickOpen}
                />,
              ]
            : []
        }
      />
      <ConversationSearch />
      <div className={classes.scrollable}>
        {rooms.map((conversation) => (
          <ConversationListItem
            key={conversation._id}
            isActive={conversation._id === currentConversation._id}
            conversation={conversation}
            name={conversation.name}
            snippet={conversation.snippet}
            handleChangeRoom={handleChangeRoom}
          />
        ))}
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter channel name and description</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Channel name"
            type="text"
            fullWidth
            onChange={(event) => setChannelName(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Channel description"
            type="text"
            fullWidth
            onChange={(event) => setChannelDescription(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCreateChannel({ name: channelName, description: channelDescription });
              handleClose();
            }}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
