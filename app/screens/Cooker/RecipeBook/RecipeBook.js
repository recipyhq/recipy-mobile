/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import colors from '../../../config/colors';
import RecipeBookItem from '../../../components/Recipe/RecipeBook/RecipeBookItem';

class RecipeBook extends Component {
  handlePressBookContent() {
    const { navigation } = this.props;
    navigation.navigate('RecipeBookContent');
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
        style={{
          backgroundColor: colors.primaryWhite,
        }}
      >
        <RecipeBookItem
          recipe={null}
          onPress={() => (
            this.handlePressBookContent())
        }
        />
      </ScrollView>
    );
  }
}

RecipeBook.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
};
export default RecipeBook;
