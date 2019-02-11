/* eslint-disable react/destructuring-assignment,no-undef */
import React, { Component } from 'react';
import {
  ScrollView,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import colors from '../../../config/colors';
import MyRecipeItem from '../../../components/Recipe/MyRecipeItem';
import Loader from '../../../components/Loaders/Loader/Loader';
import { getAllRecipe } from '../../../api/recipe';

class MyRecipes extends Component {
  componentDidMount() {
    this.handleGetAllRecipe();
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handlePressNext(recipe) {
    const { navigation } = this.props;
    navigation.navigate('RecipeDescription', { item: recipe });
  }

  handleGetAllRecipe() {
    const { dispatch } = this.props;
    getAllRecipe(dispatch);
  }

  render() {
    const { recipesList } = this.props;
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
        style={{
          backgroundColor: colors.primaryWhite,
        }}
      >
        <Loader isLoading={this.isLoading} />
        {
          recipesList.map(recipe => (
            <MyRecipeItem
              key={recipe.id.toString()}
              recipe={recipe}
              onPress={() => (
                this.handlePressNext(recipe))
          }
            />
          ))
        }
      </ScrollView>
    );
  }
}

MyRecipes.defaultProps = {
  isLoading: true,
};

MyRecipes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  recipesList: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    recipesList: state.recipe.list,
    isLoading: state.recipe.isLoading,
  };
}

export default connect(mapStateToProps)(MyRecipes);
