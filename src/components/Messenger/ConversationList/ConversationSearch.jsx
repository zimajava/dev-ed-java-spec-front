import React from 'react';

import { makeStyles, Input } from '@material-ui/core';

const useStyles = makeStyles(
  () => ({
    root: {
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      // background: '#f4f4f8',
      padding: '8px 10px',
      // borderRadius: '10px',
      // border: 'none',
      height: '40px',
      fontSize: '14px',
      '&::placeholder': {
        textAlign: 'center',
      },
      '&:focus::placeholder': {
        textAlign: 'left',
      },
    },
  }),
  { name: 'ConversationSearch' },
);

export function ConversationSearch() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Input type="search" className={classes.input} placeholder="Search Messages" />
    </div>
  );
}
