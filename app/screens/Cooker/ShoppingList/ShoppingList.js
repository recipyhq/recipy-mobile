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
import { addIngredientToList } from '../../../actions/recipe';

class ShoppingList extends Component {
  handlePressButton(eleminList) {
    this.addIngredient(eleminList);
  }

  addIngredient(eleminList) {
    const { dispatch } = this.props;
    console.log(eleminList);
    dispatch(addIngredientToList(eleminList));
  }

  render() {
    const { navigation, shoplist } = this.props;
    /* Ca récupère la recette si jamais tu fais ta liste de course à partir d'une rectte */
    const recipe = navigation.getParam('item', 'NO-ID');
    /* Si la recette récupéré a des ingrédients, on remplie
    le tableau qu'on passera pour le display de la liste */
    if (recipe.ingredients) {
      recipe.ingredients.forEach((ingredient) => {
        this.addIngredient(ingredient.ingredient.name);
      });
    }
    return (
      <ScrollView style={{ backgroundColor: colors.primaryWhite }}>
        <TextInput
          label="Quantité ?"
        />
        <TextInput
          label="De quoi t'as besoin ?"
        />
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
            <ButtonStd
              title="Editer"
              onPress={() => {
                this.handlePressButton('bigshack');
              }}
              buttonStyle={styles.btnSendForm}
              borderRadius={30}
              fontSize={20}
              color={colors.primaryWhite}
            />
          </View>
        </View>
        <View style={{ backgroundColor: colors.primaryWhite }}>
          <ShoppingListItem list={shoplist} />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    shoplist: state.recipe.shoplist,
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
};
export default connect(mapStateToProps)(ShoppingList);
