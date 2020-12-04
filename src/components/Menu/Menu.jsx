import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  makeStyles,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import config from '../../config';
import { useChangeTheme } from '../../ThemeProvider';
import { IOSSwitch } from './Switch';

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

export const Menu = (props) => {
  const { title, children, handleLogOut } = props;
  const classes = useStyles();
  const handleChangeTheme = useChangeTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <IOSSwitch onChange={handleChangeTheme} />
          <Button onClick={handleLogOut}>LogOut</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {config.routing.map((rout, index) => (
              <NavLink key={rout.name} to={rout.path} style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={rout.name} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
