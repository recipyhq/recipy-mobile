import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import styles from './styles';

const logo = require('./images/logo_white.png');

const Logo = () => (
  <View style={styles.container}>
    <ImageBackground
      resizeMode="contain"
      source={logo}
      style={styles.logo}
    />
    <Text style={styles.text}>RECIPY</Text>
  </View>
);

export default Logo;
