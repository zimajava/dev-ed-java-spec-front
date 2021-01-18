import React from 'react';
// import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

const randomColor = Math.floor(Math.random() * 16777215).toString(16);

export function InnerAvatar({ src, alt = '' }) {
  return src ? (
    <Avatar alt={alt} src={src} />
  ) : (
    <Avatar style={{ backgroundColor: `#${randomColor}` }}>{String(alt[0]).toUpperCase()}</Avatar>
  );
}

InnerAvatar.propTypes = {};
InnerAvatar.defaultProps = {};
