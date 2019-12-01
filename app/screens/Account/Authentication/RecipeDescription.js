/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import colors from '../../../config/colors';
import RecipeDescriptionItem from '../../../components/Recipe/RecipeDescriptionItem';
import { getAllShoppingList } from '../../../api/recipe';
import { searchForRecipeBook } from '../../../api/recipebook';

class RecipeDescription extends Component {
  componentDidMount() {
    this.handlePressSearchButton();
  }

  handlePressSearchButton() {
    const { dispatch, search } = this.props;
    getAllShoppingList(dispatch);
    searchForRecipeBook(dispatch, search);
  }

  handlePressShop(recipe) {
    const { navigation } = this.props;
    navigation.navigate('ShoppingList', { item: recipe });
  }

  render() {
    const { navigation, searchBookList } = this.props;
    const recipe = navigation.getParam('item', 'NO-ID');
    return (
      <View style={{ backgroundColor: colors.primaryWhite }}>
        <RecipeDescriptionItem
          key={recipe.id.toString()}
          recipe={recipe}
          dropDownInfo={searchBookList}
          onPress={() => (
            this.handlePressShop(recipe))
          }
          onSearch={() => (
            this.handlePressSearchButton())
          }
          navigation={navigation}
        />
      </View>
    );
  }
}

RecipeDescription.defaultProps = {
  searchBookList: [],
};

function mapStateToProps(state) {
  return {
    search: state.recipebook.search,
    searchBookList: state.recipebook.searchBookList,
    user: state.user,
  };
}

RecipeDescription.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  searchBookList: PropTypes.array,
  // eslint-disable-next-line react/forbid-prop-types
  search: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(RecipeDescription);
