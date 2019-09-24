import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableWithoutFeedback, Text,
} from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { showRecipe } from '../../actions/recipe';
import { getRecipe } from '../../api/recipe';
import colors from '../../config/colors';

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
          id: PropTypes.number.isRequired,
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

  handlePressShoppingList() {
    const { navigation } = this.props;
    navigation.navigate('ShoppingList', { item: null });
  }

  render() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => this.handlePressShowDetails()}>
          <View>
            <Card image={{ uri: 'https://img-3.journaldesfemmes.fr/vCNeVFvdxQToSZ6PDys2Xhdd8UE=/748x499/smart/3091d3c67b5947cfacdd9b1bee285d80/recipe-jdf/10018082.jpg' }}>
              <View style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
              }}
              >
                <Text style={{ fontWeight: 'bold', color: colors.primaryOrange, fontSize: 20 }}>Gauffre</Text>
              </View>
            </Card>
            <Card image={{ uri: 'http://www.mesinspirationsculinaires.com/wp-content/uploads/2013/07/salade-de-tomate-avocat3.jpg' }}>
              <View style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
              }}
              >
                <Text style={{ fontWeight: 'bold', color: colors.primaryOrange, fontSize: 20 }}>Salade de tomate avocat</Text>
              </View>
            </Card>
            <Card image={{ uri: 'https://static.cuisineaz.com/400x320/i76902-salade-de-riz-complete.jpg' }}>
              <View style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
              }}
              >
                <Text style={{ fontWeight: 'bold', color: colors.primaryOrange, fontSize: 20 }}>Salade de riz</Text>
              </View>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentRecipe: state.recipe.currentRecipe,
  };
}

export default connect(mapStateToProps)(withNavigation(PlanningView));
