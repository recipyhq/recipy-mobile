import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, FlatList, CheckBox,
} from 'react-native';
import styles from '../../screens/Authentication/styles';
import style from '../Style/style';

const ShoppingListItemConsult = ({ list }) => (
  <View style={styles.container}>
    <Text style={style.pageTitle}>
      { list.name }
    </Text>
    <FlatList
      data={Object.keys(list.ingredients)}
      renderItem={({ item }) => (
        <View style={style.listItem}>
          <Text style={style.listText}>{item.toString()}</Text>
          <CheckBox />
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
