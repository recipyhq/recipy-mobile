import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, TouchableHighlight, View,
} from 'react-native';
import style from '../Style/style';
import styles from '../../screens/Authentication/styles';

const AllShoppingListItems = ({
  onPress, shoppingList,
}) => (
  <View style={styles.container}>
    <TouchableHighlight onPress={onPress}>
      <Text style={style.shoppingListTitle}>
        { shoppingList.name }
      </Text>
    </TouchableHighlight>
  </View>
);

AllShoppingListItems.propTypes = {
  onPress: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  shoppingList: PropTypes.object.isRequired,
};

export default AllShoppingListItems;
