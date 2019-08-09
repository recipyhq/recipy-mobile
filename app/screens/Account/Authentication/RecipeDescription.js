/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import colors from '../../../config/colors';
import RecipeDescriptionItem from '../../../components/Recipe/RecipeDescriptionItem';
import ModalItem from '../../../components/Recipe/ModalItem';
import { getAllShoppingList } from '../../../api/recipe';

class RecipeDescription extends Component {
  componentDidMount() {
    this.handlePressSearchButton();
  }

  handlePressSearchButton() {
    const { dispatch } = this.props;
    getAllShoppingList(dispatch);
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
        <ModalItem dropDownInfo={searchBookList} currentRecipe={recipe} />
        <RecipeDescriptionItem
          key={recipe.id.toString()}
          recipe={recipe}
          dropDownInfo={searchBookList}
          onPress={() => (
            this.handlePressShop(recipe))
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
};
export default connect(mapStateToProps)(RecipeDescription);
