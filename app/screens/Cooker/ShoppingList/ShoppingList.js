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
  changeIngredient, changeSearchQuery, changeQuantity, changeIngredientText,
} from '../../../actions/recipe';
import { createShoppingList, searchForIngredient } from '../../../api/recipe';
import Loader from '../../../components/Loaders/Loader/Loader';
import style from '../../../components/Style/style';

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
    const ingId = [];
    list.map(ingredient => ingId.push(ingredient.ingredient.id));
    const { dispatch, navigation, user } = this.props;
    createShoppingList(dispatch, title, list, ingId, navigation, user);
  }

  addIngredient(quantity, quantityType, ingredient) {
    const { dispatch, allIngredientList } = this.props;
    dispatch(addIngredientToList(quantity, quantityType, ingredient, allIngredientList));
    this.handleChangeQuantity('');
    this.handleIngredientText('');
    this.handleChangeIngredient(null);
  }

  handleChangeTitle(text) {
    const { dispatch } = this.props;
    dispatch(changeTitle(text));
  }

  handleChangeQuantity(text) {
    const { dispatch } = this.props;
    dispatch(changeQuantity(text));
  }

  handleIngredientText(text) {
    const { dispatch } = this.props;
    dispatch(changeIngredientText(text));
  }

  handleChangeIngredient(elem) {
    const { dispatch } = this.props;
    dispatch(changeIngredient(elem));
  }


  handleChangeSearchQuery(text) {
    const { dispatch } = this.props;
    dispatch(changeSearchQuery(text));
  }

  handlePressSearchButton(search, resolve, reject) {
    const { dispatch } = this.props;
    searchForIngredient(dispatch, search, resolve, reject);
  }

  handleUpdate() {
    const {
      navigation, shoplist,
    } = this.props;
    const recipe = navigation.getParam('item', 'NO-ID');
    if (recipe !== null && recipe.ingredients.length !== 0) {
      this.handleChangeTitle(recipe.title);
      shoplist.splice(0, shoplist.length);
      recipe.ingredients.map(ingredient => this.addIngredient('250', 'grammes', ingredient.ingredient));
      recipe.ingredients.splice(0, recipe.ingredients.length);
    }
  }

  render() {
    const {
      shoplist, shoplistTitle, dispatch, allIngredientList,
    } = this.props;

    return (
      <View style={{ backgroundColor: colors.primaryWhite, flex: 1 }}>
        <Loader isLoading={this.isLoading} />
        <Input
          label="Titre de la liste de course"
          onChangeText={(text) => { this.handleChangeTitle(text); }}
        />
        <View>
          <SearchableDropdown
            onTextChange={text => this.handleIngredientText(text)}
            onItemSelect={item => this.addIngredient('', '', item)}
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
};

function mapStateToProps(state) {
  return {
    shoplist: state.recipe.shoplist,
    shoplistTitle: state.recipe.shoplistTitle,
    shoplistQuantity: state.recipe.shoplistQuantity,
    shoplistIngredient: state.recipe.shoplistIngredient,
    shoplistIngredientText: state.recipe.shoplistIngredientText,
    isLoading: state.user.isLoading,
    allIngredientList: state.recipe.allIngredientList,
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
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  allIngredientList: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  search: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(ShoppingList);
