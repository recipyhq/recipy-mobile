import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

const HomeButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.wrapper}>
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

HomeButton.defaultProps = {
  onPress: () => null,
};

HomeButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};
export default HomeButton;
