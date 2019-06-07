import React from 'react';
import PropTypes from 'prop-types';
import {
  StatusBar, ScrollView,
} from 'react-native';
import styles from './styles';
import colors from '../../config/colors';

const ContainerView = ({ children, ...props }) => (
  <ScrollView keyboardShouldPersistTaps="handled" style={[styles.container]} {...props}>
    <StatusBar
      barStyle="light-content"
      backgroundColor={colors.primaryOrange}
      hidden
    />
    {children}
  </ScrollView>
);

ContainerView.propTypes = {
  // eslint-disable-next-line react/require-default-props,react/forbid-prop-types
  children: PropTypes.any,
};

export default ContainerView;
