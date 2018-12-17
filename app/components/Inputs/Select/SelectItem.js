import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'react-native';

const SelectItem = ({ label, value }) => (
  <Picker.Item label={label} value={value} />
);

SelectItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
export default SelectItem;
