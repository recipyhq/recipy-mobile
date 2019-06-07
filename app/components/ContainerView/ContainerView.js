import React from 'react';
import PropTypes from 'prop-types';
import {
  StatusBar, TouchableWithoutFeedback, Keyboard, View,
} from 'react-native';
import styles from './styles';
import colors from '../../config/colors';

const ContainerView = ({ children, ...props }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={[styles.container]} {...props}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primaryOrange}
        hidden
      />
      {children}
    </View>
  </TouchableWithoutFeedback>
);

ContainerView.propTypes = {
  // eslint-disable-next-line react/require-default-props,react/forbid-prop-types
  children: PropTypes.any,
};

export default ContainerView;
