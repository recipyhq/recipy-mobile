import React from 'react';
import { View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const logo = require('../../../assets/logo_orange.png');

const Logo = ({
  style, width, height, fontSize, ...props
}) => (
  <View style={[styles.container, style]} {...props}>
    <ImageBackground
      resizeMode="contain"
      source={logo}
      style={[styles.logo, { width, height }]}
    />
  </View>
);

Logo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  style: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  fontSize: PropTypes.number,
};

Logo.defaultProps = {
  width: 100,
  height: 100,
  fontSize: 10,
};

export default Logo;
