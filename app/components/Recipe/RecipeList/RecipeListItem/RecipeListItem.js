import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import colors from '../../../../config/colors';
import style from './style';
import { showRecipe } from '../../../../actions/recipe';

class RecipeListItem extends Component {
  constructor(recipe) {
    super(recipe);
    this.recipe = recipe;
  }

  static get propTypes() {
    return {
      recipe: PropTypes.shape(
        {
          title: PropTypes.string.isRequired,
          image_url: PropTypes.string,
          description: PropTypes.string,
        },
      ).isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
    };
  }

  handlePressShowDetails() {
    const { dispatch, navigation } = this.props;
    dispatch(showRecipe(navigation, this.recipe));
  }

  render() {
    return (
      <View style={style.container}>
        <Card
          title={this.recipe.title}
          image={{ uri: this.recipe.image_url }}
        >
          <Text style={style.recipeDescription}>
            {this.recipe.description}
          </Text>
          <Text style={style.recipeTime}>
            {`Temps de réalisation : ${this.recipe.time} minutes`}
          </Text>
          <Button
            icon={{
              name: 'cutlery',
              color: colors.primaryWhite,
              size: 15,
              type: 'font-awesome',
            }}
            backgroundColor="#03A9F4"
            onPress={this.handlePressShowDetails}
            buttonStyle={
              {
                borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
              }
            }
            title="Je veux cuisiner !"
          />
        </Card>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipe.currentRecipe,
  };
}

export default connect(mapStateToProps)(RecipeListItem);
