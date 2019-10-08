import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, FlatList, CheckBox,
} from 'react-native';
import styles from '../../screens/Account/Authentication/styles';
import style from '../Style/style';
import { updateCheckbox } from '../../api/recipe';

const ShoppingListItemConsult = ({ list, dispatch, navigation }) => (
  <View style={styles.container}>
    <Text style={style.pageTitle}>
      { list.name }
    </Text>
    <FlatList
      data={list.ingredients}
      extraData={list.ingredients}
      renderItem={({ item, index }) => (
        <View style={style.listItem}>
          <Text style={style.listText}>{`${item.quantity == null ? '' : `${item.quantity[0]} ${item.quantity[1]}`} ${item.ingredient.name.toString()}`}</Text>
          <CheckBox
            value={item.checked}
            checked={item.checked}
            onChange={() => {
              updateCheckbox(dispatch, list, index, navigation);
            }}
          />
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
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
};

export default ShoppingListItemConsult;
