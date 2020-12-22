import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { makeStyles, Button, CssBaseline, Typography, Container } from '@material-ui/core';
import { parse } from 'query-string';

import { actionConfirmMailRequest } from '../actions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const ConfirmMail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { search } = useLocation();

  const { token } = parse(search);

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(actionConfirmMailRequest({ token }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Confirm Mail
        </Typography>
        <form className={classes.form} onSubmit={onFormSubmit}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Confirm Mail
          </Button>
        </form>
      </div>
    </Container>
  );
};
