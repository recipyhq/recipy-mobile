import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, FlatList, CheckBox,
} from 'react-native';
import style from '../Style/style';
import { updateCheckbox } from '../../api/recipe';

const ShoppingListItemConsult = ({
  list, dispatch, navigation, tag, baseList,
}) => (
  <View>
    <Text style={style.tagTitle}>
      {' '}
      {tag}
      {' '}
    </Text>
    <FlatList
      data={
        list.sort((a) => {
          if (a.checked === true) return 1;
          if (a.checked === false) return -1;
          return 0;
        })}
      extraData={list}
      renderItem={({ item }) => (
        <View style={style.listItem}>
          <Text style={style.listText}>{`${item.quantity == null ? '' : `${item.quantity[0]} ${item.quantity[1]}`} ${item.ingredient.name.toString()}`}</Text>
          <CheckBox
            value={item.checked}
            checked={item.checked}
            onValueChange={() => {
              updateCheckbox(dispatch, baseList, item.ingredient, navigation);
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
  list: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  baseList: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tag: PropTypes.object.isRequired,
};

export default ShoppingListItemConsult;
