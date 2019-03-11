import React, { Component } from 'react';
import {
  View, ScrollView,
} from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import colors from '../../../config/colors';
import TextInput from '../../../components/Inputs/StdTextInput/StdTextInput';
import ButtonStd from '../../../components/Buttons/ButtonStd';
import styles from '../../Authentication/styles';
import ShoppingListItem from '../../../components/ShoppingList/ShoppingListItem';
import {
  addIngredientToList,
  addIngredientListToList,
  changeQuantity,
  changeIngredient,
} from '../../../actions/recipe';

class ShoppingList extends Component {
  handlePressButton(eleminList) {
    this.addIngredient(eleminList);
  }

  addIngredient(eleminList) {
    const { dispatch } = this.props;
    dispatch(addIngredientToList(eleminList));
  }

  addIngredientFromRecipe(list) {
    const { dispatch } = this.props;
    dispatch(addIngredientListToList(list));
  }

  handleChangeQuantity(text) {
    const { dispatch } = this.props;
    dispatch(changeQuantity(text));
  }

  handleChangeIngredient(text) {
    const { dispatch } = this.props;
    dispatch(changeIngredient(text));
  }

  render() {
    const {
      navigation, shoplist, shoplistQuantity, shoplistIngredient, dispatch,
    } = this.props;
    const recipe = navigation.getParam('item', 'NO-ID');
    if (recipe.ingredients) {
      /* recipe.ingredients.map(ingredient => this.addIngredient(ingredient.ingredient.name)); */
      recipe.ingredients.map(ingredient => shoplist.push(ingredient.ingredient.name));
      recipe.ingredients = [];
    }
    return (
      <ScrollView style={{ backgroundColor: colors.primaryWhite }}>
        <TextInput
          label="Quantité ?"
          onChangeText={(text) => { this.handleChangeQuantity(text); }}
        />
        <TextInput
          label="De quoi t'as besoin ?"
          onChangeText={(text2) => { this.handleChangeIngredient(text2); }}
        />
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
            <ButtonStd
              title="Ajouter"
              onPress={() => {
                this.handlePressButton(`${shoplistQuantity} ${shoplistIngredient}`);
              }}
              buttonStyle={styles.btnSendForm}
              borderRadius={30}
              fontSize={20}
              color={colors.primaryWhite}
            />
          </View>
        </View>
        <View style={{ backgroundColor: colors.primaryWhite }}>
          <ShoppingListItem list={shoplist} dispatch={dispatch} />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    shoplist: state.recipe.shoplist,
    shoplistQuantity: state.recipe.shoplistQuantity,
    shoplistIngredient: state.recipe.shoplistIngredient,
    isLoading: state.user.isLoading,
  };
}

ShoppingList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  shoplist: PropTypes.array.isRequired,
  shoplistQuantity: PropTypes.string.isRequired,
  shoplistIngredient: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(ShoppingList);
