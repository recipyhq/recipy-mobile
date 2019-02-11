/* eslint-disable react/destructuring-assignment,no-undef */
import React, { Component } from 'react';
import {
  ScrollView, FlatList,
} from 'react-native';
import { PropTypes } from 'prop-types';
import colors from '../../../config/colors';
import MyRecipeItem from '../../../components/Recipe/MyRecipeItem';
import Loader from '../../../components/Loaders/Loader/Loader';
import { getAllRecipe } from '../../../api/user';

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
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
        style={{
          backgroundColor: colors.primaryWhite,
        }}
      >
        <Loader isLoading={this.isLoading} />
        <FlatList
          // Resultat de la requete va ici
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <MyRecipeItem recipe={item} onPress={() => (this.handlePressNext(item))} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />

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
};
export default MyRecipes;
