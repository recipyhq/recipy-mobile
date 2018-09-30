import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import colors from '../../config/colors';
import styles from './styles';

const InputWithLabelAndIcon = ({ label, iconName }) => (
  <View style={styles.container}>
    <Fumi
      label={label}
      iconClass={FontAwesomeIcon}
      iconName={iconName}
      iconColor={colors.primaryOrange}
      iconSize={20}
      labelStyle={{ fontFamily: 'sans-serif' }}
      style={styles.input}
    />
  </View>
);

InputWithLabelAndIcon.propTypes = {
  label: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
};

export default InputWithLabelAndIcon;
