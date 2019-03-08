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

class ShoppingList extends Component {
  handlePressButton(user) {
    /* Ca push un hello world pour tester */
    user.shoplist.push('hello world');
    console.log(user.shoplist.length);
    this.forceUpdate();
  }

  render() {
    const { navigation } = this.props;
    const { user } = this.props;
    /* Ca récupère la recette si jamais tu fais ta liste de course à partir d'une rectte */
    const recipe = navigation.getParam('item', 'NO-ID');
    /* Si la recette récupéré a des ingrédients, on remplie
    le tableau qu'on passera pour le display de la liste */
    if (recipe.ingredients) {
      recipe.ingredients.forEach((ingredient) => {
        console.log(ingredient.ingredient.name);
        user.shoplist.push(ingredient.ingredient.name);
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
            /* Ajoute une element dans la liste */
            <ButtonStd
              title="Editer"
              onPress={() => {
                /* C'est la que l'ajout s'effectue */
                this.handlePressButton(user);
              }}
              buttonStyle={styles.btnSendForm}
              borderRadius={30}
              fontSize={20}
              color={colors.primaryWhite}
            />
          </View>
        </View>
        <View style={{ backgroundColor: colors.primaryWhite }}>
          <ShoppingListItem list={user.shoplist} />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: {
      shoplist: state.recipe.shoplist,
    },
    isLoading: state.user.isLoading,
  };
}

ShoppingList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(ShoppingList);
