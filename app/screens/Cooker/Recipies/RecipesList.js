import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { ScrollView } from 'react-native';
import ContainerView from '../../../components/ContainerView/ContainerView';
import { changeSearchQuery } from '../../../actions/recipe';
import { searchForRecipe } from '../../../api/recipe';
import RecipeListItem from '../../../components/Recipe/RecipeList/RecipeListItem/RecipeListItem';

class RecipesList extends Component {
  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  static get defaultProps() {
    return {
      resultsList: [],
    };
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      isLoading: PropTypes.bool.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      search: PropTypes.object.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      resultsList: PropTypes.array,
    };
  }

  handleChangeSearchQuery(text) {
    const { dispatch } = this.props;
    dispatch(changeSearchQuery(text));
  }

  handlePressSearchButton(search) {
    const { dispatch } = this.props;
    searchForRecipe(dispatch, search);
  }

  render() {
    const { resultsList } = this.props;
    return (
      <ContainerView>
        <SearchBar
          onChangeText={(text) => {
            this.handleChangeSearchQuery(text);
            const { search } = this.props;
            this.handlePressSearchButton(search);
          }}
          onClear={() => {
            const { search } = this.props;
            search.q = '';
          }}
          placeholder="Rechercher une recette, ingrédient ..."
          value={this.props.search.q}
          showLoading={this.props.isLoading}
          lightTheme
          round
        />
        <ScrollView>
          {
            resultsList.map(recipe => <RecipeListItem key={recipe.id} recipe={recipe} />)
          }
        </ScrollView>
      </ContainerView>
    );
  }
}

function mapStateToProps(state) {
  return {
    resultsList: state.recipe.searchList,
    isLoading: state.recipe.isLoading,
    search: state.recipe.search,
  };
}

export default connect(mapStateToProps)(RecipesList);
