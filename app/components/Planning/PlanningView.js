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
import RecipeListItem from '../../screens/Cooker/Profile';

class PlanningView extends Component {
  static get defaultProps() {
    return {
      currentRecipe: null,
    };
  }

  static get propTypes() {
    return {
      dayPlan: PropTypes.shape(
        [
          {
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            image_url: PropTypes.string,
            description: PropTypes.string,
            time: PropTypes.number,
          },
        ],
      ).isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      currentRecipe: PropTypes.object,
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
    };
  }

  handleRetrieveAndShowRecipe(recipeId) {
    const { dispatch, navigation } = this.props;
    const promiseGetRecipe = id => new Promise((resolve, reject) => {
      getRecipe(dispatch, id, resolve, reject);
    });
    promiseGetRecipe(recipeId).then(() => {
      const { currentRecipe } = this.props;
      dispatch(showRecipe(navigation, currentRecipe));
    });
  }

  render() {
    const { dayPlan } = this.props;
    return (
      <View>
        {
          dayPlan.map(day => (
            <TouchableWithoutFeedback onPress={() => this.handleRetrieveAndShowRecipe(day.id)}>
              <View>
                <Card image={{ uri: day.image_url ? day.image_url : 'https://pngimage.net/wp-content/uploads/2018/06/not-found-png-3.png' }}>
                  <View style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
                  }}
                  >
                    <Text style={{ fontWeight: 'bold', color: colors.primaryOrange, fontSize: 20 }}>
                      { `Titre${dayPlan.title}` }
                    </Text>
                  </View>
                </Card>
              </View>
            </TouchableWithoutFeedback>
          ))
        }
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
