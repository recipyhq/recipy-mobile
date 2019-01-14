/* eslint-disable react/destructuring-assignment,no-undef,no-console */
import React, { Component } from 'react';
import {
  ScrollView, FlatList, View, ActivityIndicator,
} from 'react-native';
import { PropTypes } from 'prop-types';
import colors from '../../../config/colors';
import MyRecipeItem from '../../../components/Recipe/MyRecipeItem';

class MyRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch('https://staging-recipy.herokuapp.com/api/recipes')
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, () => {

        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handlePressNext(recipe) {
    const { navigation } = this.props;
    navigation.navigate('RecipeDescription', { item: recipe });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
        style={{
          backgroundColor: colors.primaryWhite,
        }}
      >
        <FlatList
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
  navigation: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
};
export default MyRecipes;
