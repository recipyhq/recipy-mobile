import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { showRecipe } from '../../actions/recipe';
import { getRecipe } from '../../api/recipe';

class PlanningView extends Component {
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
    return (
      <TouchableWithoutFeedback onPress={() => this.handlePressShowDetails()}>
        <View>
          <Card image={{ uri: 'https://img-3.journaldesfemmes.fr/vCNeVFvdxQToSZ6PDys2Xhdd8UE=/748x499/smart/3091d3c67b5947cfacdd9b1bee285d80/recipe-jdf/10018082.jpg' }} />
          <Card image={{ uri: 'http://www.mesinspirationsculinaires.com/wp-content/uploads/2013/07/salade-de-tomate-avocat3.jpg' }} />
          <Card image={{ uri: 'https://static.cuisineaz.com/400x320/i76902-salade-de-riz-complete.jpg' }} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentRecipe: state.recipe.currentRecipe,
  };
}

export default connect(mapStateToProps)(withNavigation(PlanningView));
