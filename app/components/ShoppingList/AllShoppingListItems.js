import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View,
} from 'react-native';
import style from '../Style/style';
import styles from '../../screens/Account/Authentication/styles';

const AllShoppingListItems = ({
  shoppingList,
}) => (
  <View style={styles.container}>
    <Text style={style.shoppingListTitle}>
      { shoppingList.name }
    </Text>
  </View>
);

AllShoppingListItems.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  shoppingList: PropTypes.object.isRequired,
};

export default AllShoppingListItems;
