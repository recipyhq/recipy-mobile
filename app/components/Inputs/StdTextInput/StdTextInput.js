import React from 'react';
import { TextField } from 'react-native-material-textfield';
import colors from '../../../config/colors';

const TextInputIcon = ({ label, ...props }) => (
  <TextField
    label={label}
    tintColor={colors.primaryOrange}
    {...props}
  />
);

export default TextInputIcon;
