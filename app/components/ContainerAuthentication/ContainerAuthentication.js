import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import styles from './styles';

const ContainerAuthentication = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      {children}
    </View>
  </TouchableWithoutFeedback>
);

ContainerAuthentication.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default ContainerAuthentication;
