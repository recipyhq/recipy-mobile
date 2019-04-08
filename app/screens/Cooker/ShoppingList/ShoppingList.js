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
  changeTitle,
  changeIngredient,
} from '../../../actions/recipe';
import { createShoppingList } from '../../../api/recipe';
import Loader from '../../../components/Loaders/Loader/Loader';

class ShoppingList extends Component {
  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handlePressButton(eleminList) {
    this.addIngredient(eleminList);
  }

  handleCreateList(title, list) {
    const ingId = [];
    list.map(ingredient => ingId.push(ingredient.id));
    const { dispatch, navigation } = this.props;
    createShoppingList(dispatch, title, ingId, navigation);
  }

  addIngredient(eleminList) {
    const { dispatch } = this.props;
    dispatch(addIngredientToList(eleminList));
  }

  handleChangeTitle(text) {
    const { dispatch } = this.props;
    dispatch(changeTitle(text));
  }

  handleChangeIngredient(text) {
    const { dispatch } = this.props;
    dispatch(changeIngredient(text));
  }

  render() {
    const {
      navigation, shoplist, shoplistTitle, dispatch,
    } = this.props;
    const recipe = navigation.getParam('item', 'NO-ID');
    if (recipe.ingredients.length !== 0) {
      this.handleChangeTitle(recipe.title);
      shoplist.splice(0, shoplist.length);
      recipe.ingredients.map(ingredient => shoplist.push(ingredient.ingredient));
      recipe.ingredients.splice(0, recipe.ingredients.length);
    }
    return (
      <ScrollView style={{ backgroundColor: colors.primaryWhite }}>
        <TextInput
          label="Titre"
          onChangeText={(text) => { this.handleChangeTitle(text); }}
          value={shoplistTitle}
        />
        <Loader isLoading={this.isLoading} />
        {/*
        <TextInput
          label="Ingrédient ?"
          onChangeText={(text2) => { this.handleChangeIngredient(text2); }}
        />
*/
        /*
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
            <ButtonStd
              title="Ajouter à la liste"
              onPress={() => {
                this.handlePressButton(`${shoplistIngredient}`);
              }}
              buttonStyle={styles.btnSendForm}
              borderRadius={30}
              fontSize={20}
              color={colors.primaryWhite}
            />
          </View>
        </View>
        */}
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
            <ButtonStd
              title="Créer la liste de course"
              onPress={() => {
                this.handleCreateList(shoplistTitle, shoplist);
              }}
              buttonStyle={styles.btnSendForm}
              borderRadius={5}
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

ShoppingList.defaultProps = {
  shoplist: [],
  isLoading: true,
};

function mapStateToProps(state) {
  return {
    shoplist: state.recipe.shoplist,
    shoplistTitle: state.recipe.shoplistTitle,
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
  shoplist: PropTypes.array,
  shoplistTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};
export default connect(mapStateToProps)(ShoppingList);
