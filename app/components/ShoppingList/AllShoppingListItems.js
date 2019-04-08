import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, TouchableHighlight, View,
} from 'react-native';
import style from './allShoppingListItemStyle';

const AllShoppingListItems = ({
  onPress, shoppingList, onDelete, ...props
}) => (
  <TouchableHighlight onPress={onPress}>

    <View style={style.container} {...props}>
      <Text style={style.recipeBookTitle}>
        { shoppingList.name }
      </Text>
      <Text style={style.description}>
        {shoppingList.ingredients.toString()}
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
