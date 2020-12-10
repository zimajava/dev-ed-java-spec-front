import React from 'react';
import clsx from 'clsx';

import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { BadgeAvatar } from './BadgeAvatar';

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      '&:hover': {
        background: '#f4f4f8',
        cursor: 'pointer',
      },
    },
    photo: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginRight: '10px',
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0 /* or some value */,
    },
    title: {
      fontSize: '14px',
      fontWeight: 'bold',
      textTransform: 'capitalize',
      margin: 0,
    },
    snippet: {
      '& > span': {
        flex: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '14px',
        color: '#888',
        margin: 0,
      },
    },
    snippetFake: {
      height: '77px',
    },
    isActive: {
      background: '#eeeef1',
    },
  }),
  { name: 'ConversationListItem' },
);

export function ConversationListItem(props) {
  const {
    isActive,
    conversation,
    name,
    snippet = '',
    isShowSnippet = true,
    handleChangeRoom,
  } = props;
  const classes = useStyles();

  return (
    // <div
    //   className={clsx(classes.root, { [classes.isActive]: isActive })}
    //   onClick={() => handleChangeRoom(conversation)}
    // >
    //   <img className={classes.photo} src="photo" alt="conversation" />
    //   <div className={classes.info}>
    //     <h1 className={classes.title}>{name}</h1>
    //     {isShowSnippet ? <p className={classes.snippet}>{snippet}</p> : null}
    //   </div>
    // </div>
    <ListItem
      className={clsx({ [classes.isActive]: isActive }, { [classes.snippetFake]: !snippet })}
      button
      onClick={() => handleChangeRoom(conversation)}
    >
      <ListItemIcon>
        <BadgeAvatar alt={name} isOnline={conversation.isOnline} />
      </ListItemIcon>
      <div className={classes.info}>
        <ListItemText primary={name} />
        {isShowSnippet ? <ListItemText className={classes.snippet}>{snippet}</ListItemText> : null}
      </div>
    </ListItem>
  );
}
