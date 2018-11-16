import PropTypes from 'prop-types';
import React from 'react';
import {
  StatusBar, TouchableWithoutFeedback, Keyboard,
} from 'react-native';

import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import colors from '../../config/colors';

const ContainerView = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryWhite }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primaryOrange}
      />
      {children}
    </SafeAreaView>
  </TouchableWithoutFeedback>
);

ContainerView.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default ContainerView;
