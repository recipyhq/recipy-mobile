import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

const ButtonLink = ({ text, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.wrapperLink}>
      <Text style={styles.textLink}>{text}</Text>
    </View>
  </TouchableOpacity>
);

ButtonLink.defaultProps = {
  onPress: () => null,
};

ButtonLink.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};
export default ButtonLink;
