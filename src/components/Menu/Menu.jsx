import React from 'react';
import { makeStyles, AppBar, Toolbar, CssBaseline, Typography, Button } from '@material-ui/core';
import { InnerAvatar } from '../InnerAvatar/InnerAvatar';

// import config from '../../config';
// import { useChangeTheme } from '../../ThemeProvider';
// import { IOSSwitch } from './Switch';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: '15px',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const Menu = ({ title, avatarSrc, handleLogOut }) => {
  const classes = useStyles();
  // const handleChangeTheme = useChangeTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <InnerAvatar src={avatarSrc} alt={title} />
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {/* <IOSSwitch onChange={handleChangeTheme} /> */}
          <Button variant="contained" color="secondary" onClick={handleLogOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
