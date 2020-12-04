import React, { Children, cloneElement } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    /* borderBottom: '1px solid #eeeef1', */
    position: 'sticky',
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 800,
  },
  items: {
    flex: 1,
    padding: '10px',
    display: 'flex',
  },
  rightItems: {
    flexDirection: 'row-reverse',
  },
}));

export function Toolbar(props) {
  const { title, leftItems, rightItems } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.items}>
        {Children.map(leftItems, (item) => cloneElement(item, { toolbarLeft: true }))}
      </div>
      <h1 className={classes.title}>{title}</h1>
      <div className={`${classes.items} ${classes.rightItems}`}>
        {Children.map(rightItems, (item) => cloneElement(item, { toolbarRight: true }))}
      </div>
    </div>
  );
}
