import React, { Component } from 'react';
import {
  View, ScrollView,
} from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import SearchableDropdown from 'react-native-searchable-dropdown';
import colors from '../../../config/colors';
import TextInput from '../../../components/Inputs/StdTextInput/StdTextInput';
import ButtonStd from '../../../components/Buttons/ButtonStd';
import ShoppingListItem from '../../../components/ShoppingList/ShoppingListItem';
import {
  addIngredientToList,
  changeTitle,
  changeIngredient, changeSearchQuery,
} from '../../../actions/recipe';
import { createShoppingList, searchForIngredient } from '../../../api/recipe';
import Loader from '../../../components/Loaders/Loader/Loader';
import style from '../../../components/Style/style';

class ShoppingList extends Component {
  componentDidMount() {
    this.handleChangeSearchQuery('');
    const { search } = this.props;
    this.handlePressSearchButton(search);
  }

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
    const { dispatch, navigation, user } = this.props;
    createShoppingList(dispatch, title, ingId, navigation, user);
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


  handleChangeSearchQuery(text) {
    const { dispatch } = this.props;
    dispatch(changeSearchQuery(text));
  }

  handlePressSearchButton(search) {
    const { dispatch } = this.props;
    searchForIngredient(dispatch, search);
  }

  render() {
    const {
      navigation, shoplist, shoplistTitle, dispatch,
    } = this.props;
    const recipe = navigation.getParam('item', 'NO-ID');
    if (recipe !== null && recipe.ingredients.length !== 0) {
      this.handleChangeTitle(recipe.title);
      shoplist.splice(0, shoplist.length);
      recipe.ingredients.map(ingredient => shoplist.push(ingredient.ingredient));
      recipe.ingredients.splice(0, recipe.ingredients.length);
    }
    const { resultsIngredientList } = this.props;
    console.ignoredYellowBox = ['Warning: Failed prop type: Invalid prop `title` of type `object` supplied to `Button`, expected `string`'];
    return (
      <View style={{ backgroundColor: colors.primaryWhite, flex: 1 }}>
        <Loader isLoading={this.isLoading} />
        <TextInput
          label="Titre de la liste de course"
          onChangeText={(text) => { this.handleChangeTitle(text); }}
          value={shoplistTitle}
        />
        <View>
          <SearchableDropdown
            onTextChange={text => text}
            onItemSelect={item => this.handlePressButton(item)}
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
            items={resultsIngredientList}
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
  resultsIngredientList: [],
  shoplistTitle: '',
};

function mapStateToProps(state) {
  return {
    shoplist: state.recipe.shoplist,
    shoplistTitle: state.recipe.shoplistTitle,
    shoplistIngredient: state.recipe.shoplistIngredient,
    isLoading: state.user.isLoading,
    search: state.recipe.search,
    resultsIngredientList: state.recipe.ingredientList,
    user: state.user,
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
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  search: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  resultsIngredientList: PropTypes.array,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(ShoppingList);
