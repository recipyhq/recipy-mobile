import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import React from 'react';

const ButtonStd = ({ title, onPress, ...props }) => (
  <Button title={title} onPress={onPress} {...props} />
);

ButtonStd.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ButtonStd;
