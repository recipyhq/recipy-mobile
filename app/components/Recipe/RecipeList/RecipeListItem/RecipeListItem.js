import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import colors from '../../../../config/colors';
import style from './style';
import { showRecipe } from '../../../../actions/recipe';
import { getRecipe } from '../../../../api/recipe';

class RecipeListItem extends Component {
  static get defaultProps() {
    return {
      currentRecipe: null,
    };
  }

  static get propTypes() {
    return {
      recipe: PropTypes.shape(
        {
          title: PropTypes.string.isRequired,
          image_url: PropTypes.string,
          description: PropTypes.string,
          time: PropTypes.number,
        },
      ).isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      currentRecipe: PropTypes.object,
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
    };
  }

  handlePressShowDetails() {
    const { dispatch, navigation, recipe } = this.props;
    const promiseGetRecipe = id => new Promise((resolve, reject) => {
      getRecipe(dispatch, id, resolve, reject);
    });
    promiseGetRecipe(recipe.id).then(() => {
      const { currentRecipe } = this.props;
      dispatch(showRecipe(navigation, currentRecipe));
    });
  }

  render() {
    const { recipe } = this.props;
    return (
      <View style={style.container}>
        <Card
          title={recipe.title}
          image={{ uri: recipe.image_url }}
        >
          <Text style={style.recipeDescription}>
            {recipe.description}
          </Text>
          <Text style={style.recipeTime}>
            {`Temps de réalisation : ${recipe.preparation_time + recipe.cooking_time} minutes`}
          </Text>
          <Button
            icon={{
              name: 'cutlery',
              color: colors.primaryWhite,
              size: 15,
              type: 'font-awesome',
            }}
            backgroundColor="#03A9F4"
            onPress={() => {
              this.handlePressShowDetails();
            }}
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
    currentRecipe: state.recipe.currentRecipe,
  };
}

export default connect(mapStateToProps)(withNavigation(RecipeListItem));
