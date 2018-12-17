import React from 'react';
import PropTypes from 'prop-types';
import { View, Picker, Text } from 'react-native';
import styles from './styles';

const Select = ({
  children, selectedValue, onValueChange, label, ...props
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Picker
      selectedValue={selectedValue}
      style={styles.picker}
      onValueChange={onValueChange}
      {...props}
    >
      {children}
    </Picker>
  </View>
);

Select.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};
export default Select;
