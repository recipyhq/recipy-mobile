import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, FlatList, CheckBox,
} from 'react-native';
import styles from '../../screens/Authentication/styles';

const ShoppingListItem = ({ list }) => (
  <View style={styles.container}>
    <FlatList
      data={list}
      renderItem={({ item }) => (
        <View>
          <CheckBox />
          <Text>{item}</Text>
        </View>
      )}
    />
  </View>
);


ShoppingListItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.array.isRequired,
};

export default ShoppingListItem;
