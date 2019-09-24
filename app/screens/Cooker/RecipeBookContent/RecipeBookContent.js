import React, { Component } from 'react';
import {
  ScrollView, View,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import colors from '../../../config/colors';
import Loader from '../../../components/Loaders/Loader/Loader';
import { getUserRecipeList, getRecipe } from '../../../api/recipe';
import { showRecipe } from '../../../actions/recipe';
import style from '../../../components/Style/style';
import RecipeBookContentItem from '../../../components/Recipe/RecipeBookContent/RecipeBookContentItem';
import { removeRecipeToRecipeBook } from '../../../api/recipebook';

class RecipeBookContent extends Component {
  componentDidMount() {
    this.handleGetAllRecipe();
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handlePressNext(recipe) {
    const { dispatch, navigation } = this.props;
    const promiseGetRecipe = id => new Promise((resolve, reject) => {
      getRecipe(dispatch, id, resolve, reject);
    });
    promiseGetRecipe(recipe.id).then(() => {
      const { currentRecipe } = this.props;
      dispatch(showRecipe(navigation, currentRecipe));
    });
  }

  async handleGetAllRecipe() {
    const { dispatch } = this.props;
    const currentUid = await SecureStore.getItemAsync('userId');
    getUserRecipeList(dispatch, currentUid);
    // TODO Faire un vrai appel vers /recipes pour pouvoir ajouter toutes les recettes
  }

  handleDeleteRecipeFromNotebook(book, recipe) {
    const { dispatch } = this.props;
    removeRecipeToRecipeBook(dispatch, book.title, 1, recipe.id, book.id); // TODO Mettre le bon id
  }

  render() {
    const { navigation } = this.props;
    const book = navigation.getParam('item', 'NO-ID');
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
        style={{
          backgroundColor: colors.primaryWhite,
        }}
      >
        <Loader isLoading={this.isLoading} />
        <View style={style.view}>
          {
          book.recipes.map(recipe => (
            <RecipeBookContentItem
              key={recipe.id.toString()}
              recipe={recipe}
              onPress={() => (
                this.handlePressNext(recipe))
              }
              onPressDelete={() => (
                this.handleDeleteRecipeFromNotebook(book, recipe))
              }
            />
          ))
        }
        </View>
      </ScrollView>
    );
  }
}

RecipeBookContent.defaultProps = {
  isLoading: true,
  currentRecipe: null,
};

RecipeBookContent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  currentRecipe: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    recipesList: state.recipe.list,
    isLoading: state.recipebook.isLoading,
    currentRecipe: state.recipe.currentRecipe,
    user: state.user,
  };
}

export default connect(mapStateToProps)(RecipeBookContent);
