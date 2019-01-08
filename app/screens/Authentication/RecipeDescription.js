/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import colors from '../../config/colors';
import RecipeDescriptionItem from '../../components/Recipe/RecipeDescriptionItem';

class RecipeDescription extends Component {
  render() {
    const { navigation } = this.props;
    const recipe = navigation.getParam('item', 'NO-ID');
    return (
      <View style={{ backgroundColor: colors.primaryWhite }}>
        <RecipeDescriptionItem recipe={recipe} />
      </View>
    );
  }
}

RecipeDescription.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
};
export default RecipeDescription;
