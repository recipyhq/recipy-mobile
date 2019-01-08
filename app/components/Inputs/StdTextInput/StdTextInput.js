import React from 'react';
import { TextField } from 'react-native';

const TextInputIcon = ({ label, ...props }) => (
  <TextField
    label={label}
    {...props}
  />
);

export default TextInputIcon;
