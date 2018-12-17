import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { PropTypes } from 'prop-types';
import colors from '../../../config/colors';
import MyRecipeItem from '../../../components/Recipe/MyRecipeItem';


class MyRecipes extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
    };
  }

  handlePressNext() {
    const { navigation } = this.props;
    navigation.navigate('RecipeDescription');
  }

  render() {
    return (
      <View style={{ backgroundColor: colors.primaryWhite, flex: 1 }}>
        <MyRecipeItem src="http://leflobart-leportel.fr/wp-content/uploads/2016/08/welsh.png" title="Wesh" view="1k" like="1k" onPress={() => (this.handlePressNext())} />
        <MyRecipeItem src="http://foodandsens.com/wp-content/uploads/2016/09/Capture-d%E2%80%99%C3%A9cran-2016-09-15-%C3%A0-14.35.49.png" title="La grosseur" view="10k" like="200" onPress={() => (this.handlePressNext())} />
      </View>
    );
  }
}

export default MyRecipes;
