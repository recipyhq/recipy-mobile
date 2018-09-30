import React from 'react';
import { View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import colors from '../../config/colors';
import styles from './styles';

const InputWithLabelAndIcon = ({ ...props }) => (
  <View style={styles.container}>
    <Fumi
      iconClass={FontAwesomeIcon}
      iconColor={colors.primaryOrange}
      iconSize={20}
      labelStyle={{ fontFamily: 'sans-serif' }}
      style={styles.input}
      {...props}
    />
  </View>
);

InputWithLabelAndIcon.propTypes = {
};

export default InputWithLabelAndIcon;
