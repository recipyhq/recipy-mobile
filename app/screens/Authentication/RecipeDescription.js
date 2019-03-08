/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import colors from '../../config/colors';
import RecipeDescriptionItem from '../../components/Recipe/RecipeDescriptionItem';

class RecipeDescription extends Component {
  handlePressShop(recipe) {
    const { navigation } = this.props;
    navigation.navigate('ShoppingList', { item: recipe });
  }

  render() {
    const { navigation } = this.props;
    const recipe = navigation.getParam('item', 'NO-ID');
    return (
      <View style={{ backgroundColor: colors.primaryWhite }}>
        <RecipeDescriptionItem
          recipe={recipe}
          onPress={() => (
            this.handlePressShop(recipe))
        }
        />
      </View>
    );
  }
}

RecipeDescription.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
};
export default RecipeDescription;
