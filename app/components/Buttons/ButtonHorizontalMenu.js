import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ButtonStd from './ButtonStd';
import colors from '../../config/colors';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.primaryWhite,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  buttonContainerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
});

const ButtonHorizontalMenu = ({
  title, onPress, ...props
}) => (
  <View style={styles.container}>
    <ButtonStd
      title={title}
      onPress={onPress}
      buttonStyle={styles.buttonStyle}
      fontSize={20}
      color={colors.primaryGrey}
      containerViewStyle={styles.buttonContainerStyle}
      {...props}
    />
  </View>
);

ButtonHorizontalMenu.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ButtonHorizontalMenu;
