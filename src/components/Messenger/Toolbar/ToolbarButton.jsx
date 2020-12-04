/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  toolbarButton: {
    color: '#007aff',
    fontSize: '28px',
    transition: 'all 0.1s',
    '&:hover': {
      cursor: 'pointer',
      color: '#0063ce',
    },
    '&:active': {
      color: '#007aff',
      opacity: '0.25',
    },
    // '&:last-child': {
    //   margin: 0,
    // },
  },
  toolbarLeftItems: { marginRight: '20px' },
  toolbarRightItems: { marginLeft: '20px' },
  composeLeftItems: {
    marginRight: '15px',
    color: '#bbbbbf',
    '&:hover': {
      color: '#99999c',
    },
  },
  composeRightItems: {
    marginLeft: '15px',
    color: '#bbbbbf',
    '&:hover': {
      color: '#99999c',
    },
  },
}));

export function ToolbarButton(props) {
  const { icon, toolbarLeft, toolbarRight, composeLeft, composeRight, handleClick } = props;
  const classes = useStyles();

  return (
    <i
      className={clsx(
        classes.toolbarButton,
        icon,
        { [classes.toolbarLeftItems]: toolbarLeft },
        { [classes.toolbarRightItems]: toolbarRight },
        { [classes.composeLeftItems]: composeLeft },
        { [classes.composeRightItems]: composeRight },
      )}
      onClick={handleClick}
    />
  );
}
