import React from 'react';
import {Alert as BootstrapAlert} from 'react-bootstrap';

const Alert = ({
  message = 'An unexpected error occurred.',
  variant = 'danger',
}) => {
  return <BootstrapAlert variant={variant}>{message}</BootstrapAlert>;
};

export default Alert;
