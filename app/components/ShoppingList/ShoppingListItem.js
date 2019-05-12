import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, FlatList,
} from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import styles from '../../screens/Authentication/styles';
import style from '../Style/style';
import { deleteIngredient } from '../../actions/recipe';
import colors from '../../config/colors';

function deleteIcon() {
  return (<FontAwesome5 name="times" color={colors.primaryGrey} size={24} />);
}

const ShoppingListItem = ({ list, dispatch }) => (
  <View style={styles.container}>
    <FlatList
      data={list}
      renderItem={({ item, index }) => (
        <View style={style.listItem}>
          <Text style={style.listText}>{item.name.toString()}</Text>
          <Button
            backgroundColor={colors.primaryWhite}
            buttonStyle={
              {
                margin: 5,
              }
            }
            title={deleteIcon()}
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
