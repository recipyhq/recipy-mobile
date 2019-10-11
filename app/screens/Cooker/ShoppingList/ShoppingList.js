import React, { Component } from 'react';
import {
  View, ScrollView,
} from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Input } from 'react-native-elements';
import colors from '../../../config/colors';
import ButtonStd from '../../../components/Buttons/ButtonStd';
import ShoppingListItem from '../../../components/ShoppingList/ShoppingListItem';
import {
  addIngredientToList,
  changeTitle,
  changeIngredient, changeSearchQuery,
  changeQuantity, changeIngredientText, changeAmount, errorDisplay,
} from '../../../actions/recipe';
import { createShoppingList, searchForIngredient, searchForQuantityType } from '../../../api/recipe';
import Loader from '../../../components/Loaders/Loader/Loader';
import style from '../../../components/Style/style';
import shoppingStyle from './style';

class ShoppingList extends Component {
  componentDidMount() {
    const { search } = this.props;
    const promiseGetIngredient = () => new Promise((resolve, reject) => {
      this.handlePressSearchButton(search, resolve, reject);
    });
    promiseGetIngredient().then(() => {
      this.handleUpdate();
    });
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handlePressButton() {
    const {
      shoplistQuantity, shoplistIngredient,
    } = this.props;
    this.addIngredient(shoplistQuantity, '', shoplistIngredient);
  }

  handleCreateList(title, list) {
    const { dispatch, navigation, allQuantityList } = this.props;
    const ingId = [];

    const tab = [];
    list.map(ingredient => ingId.push(ingredient.ingredient.id));
    list.map((ingredient) => {
      if (ingredient.quantity === '' && ingredient.quantityType === '') {
        const obj = { ingredient_id: ingredient.ingredient.id };
        tab.push(obj);
      } else {
        const found = allQuantityList.find(element => element.name === ingredient.quantityType);
        const obj = {
          ingredient_id: ingredient.ingredient.id,
          quantity: parseInt(ingredient.quantity.toString().substring(0), 10),
          quantity_type_id: found.id,
        };
        tab.push(obj);
      }
      return null;
    });
    createShoppingList(dispatch, title, list, ingId, navigation, tab);
  }

  addIngredient(quantity, quantityType, ingredient) {
    const {
      dispatch, allQuantityList, allIngredientList, shoplistIngredientText,
    } = this.props;
    if ((quantity !== '' && quantityType === '') || (quantity === '' && quantityType !== '')) errorDisplay('Erreur de l\'ajout d\'un ingredient', 'Quantité ou type de quantité manquante');
    else if (ingredient === null) errorDisplay('Erreur de l\'ajout d\'un ingredient', 'Aucun ingrédient.');
    else {
      let itemIngredient = allIngredientList.find(
        x => x.name.toLowerCase() === shoplistIngredientText.toLowerCase(),
      );
      const itemQuantity = allQuantityList.find(
        x => x.name.toLowerCase() === quantityType.toLowerCase(),
      );
      if (typeof itemIngredient !== 'undefined' && itemQuantity !== 'undefined') {
        if (ingredient !== 'undefined') itemIngredient = ingredient;
        dispatch(addIngredientToList(quantity, quantityType, itemIngredient));
        this.textInput.clear();
        this.quantityInput.input.clear();
        this.ingredientInput.input.clear();
        this.handleAmount('');
        this.handleChangeQuantity('');
        this.handleChangeIngredient(null);
      }
    }
  }

  addIngredientFromList(ingredient, ingrediantQuantity) {
    const {
      dispatch,
    } = this.props;

    if (ingredient === null) errorDisplay('Erreur de l\'ajout d\'un ingredient', 'Tous les champs doivent être remplis');
    else if (ingrediantQuantity == null) dispatch(addIngredientToList('', '', ingredient));
    else dispatch(addIngredientToList(ingrediantQuantity[0], ingrediantQuantity[1], ingredient));
  }

  handleChangeTitle(text) {
    const { dispatch } = this.props;
    dispatch(changeTitle(text));
  }

  handleChangeQuantity(text) {
    const { dispatch } = this.props;
    dispatch(changeQuantity(text));
  }

  handleSelectIngredient(ingredient) {
    const { dispatch } = this.props;
    dispatch(changeIngredient(ingredient));
    this.handleIngredientText(ingredient.name);
  }


  handleIngredientText(text) {
    const { dispatch } = this.props;
    dispatch(changeIngredientText(text));
  }

  handleChangeIngredient(elem) {
    const { dispatch } = this.props;
    dispatch(changeIngredient(elem));
  }

  handleAmount(amount) {
    const { dispatch } = this.props;
    dispatch(changeAmount(amount));
  }

  handleChangeSearchQuery(text) {
    const { dispatch } = this.props;
    dispatch(changeSearchQuery(text));
  }

  handlePressSearchButton(search, resolve, reject) {
    const { dispatch } = this.props;
    searchForIngredient(dispatch, search, resolve, reject);
    searchForQuantityType(dispatch, search, resolve, reject);
  }

  handleUpdate() {
    const {
      navigation, shoplist,
    } = this.props;
    const recipe = navigation.getParam('item', 'NO-ID');
    if (recipe !== null && recipe.ingredients.length !== 0) {
      this.handleChangeTitle(recipe.title);
      shoplist.splice(0, shoplist.length);
      recipe.ingredients.map(
        ingredient => this.addIngredientFromList(ingredient.ingredient, ingredient.quantity),
      );
      recipe.ingredients.splice(0, recipe.ingredients.length);
    }
  }

  render() {
    const {
      shoplist, shoplistTitle, dispatch,
      allIngredientList, allQuantityList, shoplistQuantity, shoplistIngredient,
      shoplistAmount,
    } = this.props;

    return (
      <View style={{ backgroundColor: colors.primaryWhite, flex: 1 }}>
        <Loader isLoading={this.isLoading} />
        <Input
          label="Titre de la liste de course"
          onChangeText={(text) => { this.handleChangeTitle(text); }}
          defaultValue={shoplistTitle}
        />
        <Input
          ref={(input) => { this.textInput = input; }}
          label="Quantité"
          onChangeText={(text) => { this.handleAmount(text); }}
          keyboardType="numeric"
        />
        <View style={shoppingStyle.infoView}>
          <View style={shoppingStyle.infoContainer}>
            <SearchableDropdown
              ref={(quantity) => { this.quantityInput = quantity; }}
              onTextChange={text => this.handleChangeQuantity(text)}
              onItemSelect={item => this.handleChangeQuantity(item.name)}
              containerStyle={{ paddingTop: 5, paddingBottom: 5 }}
              textInputStyle={{
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={allQuantityList}
              placeholder="Quelle type de quantité ?"
              resetValue={false}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={shoppingStyle.infoContainer}>
            <SearchableDropdown
              ref={(ingredient) => { this.ingredientInput = ingredient; }}
              onTextChange={text => this.handleIngredientText(text)}
              onItemSelect={item => this.handleSelectIngredient(item)}
              containerStyle={{ paddingTop: 5, paddingBottom: 5 }}
              textInputStyle={{
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={allIngredientList}
              placeholder="Ajouter un ingrédient"
              resetValue={false}
              underlineColorAndroid="transparent"
            />
          </View>


        </View>
        <View style={style.buttonContainer}>
          <ButtonStd
            title="Ajouter un ingrédient"
            onPress={() => {
              this.addIngredient(shoplistAmount, shoplistQuantity, shoplistIngredient);
            }}
            buttonStyle={style.btnSendForm}
            fontSize={15}
            color={colors.primaryWhite}
          />
        </View>
        <ScrollView style={{ backgroundColor: colors.primaryWhite }}>
          <ShoppingListItem list={shoplist} dispatch={dispatch} />
        </ScrollView>
        <View style={style.buttonContainer}>
          <ButtonStd
            title="Créer la liste de course"
            onPress={() => {
              this.handleCreateList(shoplistTitle, shoplist);
            }}
            buttonStyle={style.btnSendForm}
            fontSize={15}
            color={colors.primaryWhite}
          />
        </View>
      </View>
    );
  }
}

ShoppingList.defaultProps = {
  shoplist: [],
  isLoading: true,
  shoplistTitle: '',
  shoplistQuantity: '',
  shoplistIngredient: null,
  shoplistIngredientText: '',
  shoplistAmount: '',
};

function mapStateToProps(state) {
  return {
    shoplist: state.recipe.shoplist,
    shoplistTitle: state.recipe.shoplistTitle,
    shoplistQuantity: state.recipe.shoplistQuantity,
    shoplistIngredient: state.recipe.shoplistIngredient,
    shoplistIngredientText: state.recipe.shoplistIngredientText,
    shoplistAmount: state.recipe.shoplistAmount,
    isLoading: state.user.isLoading,
    allIngredientList: state.recipe.allIngredientList,
    allQuantityList: state.recipe.allQuantityList,
    resultsIngredientList: state.recipe.ingredientList,
    user: state.user,
    search: state.recipe.search,
  };
}

ShoppingList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  shoplist: PropTypes.array,
  shoplistTitle: PropTypes.string,
  shoplistQuantity: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  shoplistIngredient: PropTypes.object,
  shoplistIngredientText: PropTypes.string,
  shoplistAmount: PropTypes.string,
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  allIngredientList: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  allQuantityList: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  search: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(ShoppingList);
