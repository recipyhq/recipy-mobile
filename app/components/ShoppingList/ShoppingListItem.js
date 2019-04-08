import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, FlatList,
} from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../../screens/Authentication/styles';
import shoppingListStyle from './shoppingListStyle';
import { deleteIngredient } from '../../actions/recipe';

const ShoppingListItem = ({ list, dispatch }) => (
  <View style={styles.container}>
    <FlatList
      data={list}
      renderItem={({ item, index }) => (
        <View style={shoppingListStyle.listItem}>
          <Text style={shoppingListStyle.listText}>{item.name.toString()}</Text>
          <Button
            backgroundColor="#03A9F4"
            buttonStyle={
              {
                borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
              }
            }
            title="Supprimer !"
            onPress={() => {
              dispatch(deleteIngredient(index));
            }}
            key={index.toString()}
          />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);


ShoppingListItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
};

export default ShoppingListItem;
