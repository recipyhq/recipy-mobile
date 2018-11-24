import React from 'react';
import { View, ImageBackground } from 'react-native';
import styles from './styles';

const logo = require('../../../assets/logo_black.png');

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

export default Logo;
