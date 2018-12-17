import React from 'react';
import { TextField } from 'react-native-material-textfield';

const TextInputIcon = ({ label, ...props }) => (
  <TextField
    label={label}
    {...props}
  />
);

export default TextInputIcon;
