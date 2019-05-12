import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, TouchableHighlight, View,
} from 'react-native';
import style from '../Style/style';

const AllShoppingListItems = ({
  onPress, shoppingList, onDelete, ...props
}) => (
  <TouchableHighlight onPress={onPress} style={style.touch}>

    <View style={style.containerShopList} {...props}>
      <Text style={style.recipeTitle}>
        { shoppingList.name }
      </Text>
      <Text style={style.description}>
        {Object.keys(shoppingList.ingredients).toString()}
      </Text>
    </View>
  </TouchableHighlight>
);

AllShoppingListItems.propTypes = {
  onPress: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  shoppingList: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AllShoppingListItems;
