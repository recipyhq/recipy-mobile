import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../../screens/Authentication/styles';
import style from '../Style/style';
import { deleteIngredient } from '../../actions/recipe';
import colors from '../../config/colors';

const ShoppingListItem = ({ list, dispatch }) => (
  <View style={styles.container}>
    <FlatList
      data={list}
      renderItem={({ item, index }) => (
        <View style={style.listItem}>
          <Text style={style.listText}>{item.name.toString()}</Text>
          <Icon
            backgroundColor={colors.primaryWhite}
            name="times"
            onPress={() => {
              dispatch(deleteIngredient(index));
            }}
            type="font-awesome"
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
