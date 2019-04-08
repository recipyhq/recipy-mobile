import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, FlatList, CheckBox,
} from 'react-native';
import styles from '../../screens/Authentication/styles';
import shoppingListStyle from './shoppingListStyle';

const ShoppingListItemConsult = ({ list }) => (
  <View style={styles.container}>
    <Text>
      { list.name }
    </Text>
    <FlatList
      data={list.ingredients}
      renderItem={({ item }) => (
        <View style={shoppingListStyle.listItem}>
          <CheckBox />
          <Text style={shoppingListStyle.listText}>{item.toString()}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);


ShoppingListItemConsult.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
};

export default ShoppingListItemConsult;
