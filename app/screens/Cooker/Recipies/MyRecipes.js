import React, { Component } from 'react';
import {
  ScrollView, View, RefreshControl,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as SecureStore from 'expo/build/SecureStore/SecureStore';
import colors from '../../../config/colors';
import MyRecipeItem from '../../../components/Recipe/MyRecipeItem';
import Loader from '../../../components/Loaders/Loader/Loader';
import { getUserRecipeList, getRecipe } from '../../../api/recipe';
import { handleRefresh, showRecipe } from '../../../actions/recipe';
import style from '../../../components/Style/style';

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

  async handleGetAllRecipe() {
    const { dispatch } = this.props;
    const currentUid = await SecureStore.getItemAsync('userId');
    getUserRecipeList(dispatch, currentUid);
  }

  _onRefresh = () => {
    handleRefresh(true);
    this.handleGetAllRecipe().then(() => {
      handleRefresh(false);
    });
  };

  render() {
    const { recipesList, isRefreshing } = this.props;
    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={this._onRefresh}
          />
)}
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
  isRefreshing: false,
  currentRecipe: null,
};

MyRecipes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  isRefreshing: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  recipesList: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentRecipe: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    recipesList: state.recipe.myRecipeList,
    isLoading: state.recipe.isLoading,
    isRefreshing: state.recipe.isRefreshing,
    currentRecipe: state.recipe.currentRecipe,
    user: state.user,
  };
}

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipes);
