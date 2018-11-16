import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import styles from './styles';

const GradientBackground = ({
  colors, children, ...props
}) => (
  <View style={styles.container}>
    <LinearGradient colors={colors} style={styles.container} {...props}>
      {children}
    </LinearGradient>
  </View>
);

GradientBackground.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  colors: PropTypes.array.isRequired,
};

export default GradientBackground;
