import React, { Component } from 'react';
import {
  ScrollView, View,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import colors from '../../../config/colors';
import MyRecipeItem from '../../../components/Recipe/MyRecipeItem';
import Loader from '../../../components/Loaders/Loader/Loader';
import { getAllRecipe, getRecipe } from '../../../api/recipe';
import { showRecipe } from '../../../actions/recipe';
import styles from '../../Authentication/styles';
import style from '../../../components/Style/style';

import ButtonStd from '../../../components/Buttons/ButtonStd';

class MyRecipes extends Component {
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
        <View style={style.view}>
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
        </View>
      </ScrollView>
    );
  }
}

MyRecipes.defaultProps = {
  isLoading: true,
  currentRecipe: null,
};

MyRecipes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  recipesList: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentRecipe: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    recipesList: state.recipe.myRecipeList,
    isLoading: state.recipe.isLoading,
    currentRecipe: state.recipe.currentRecipe,
  };
}

export default connect(mapStateToProps)(MyRecipes);
