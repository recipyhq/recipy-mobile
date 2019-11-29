/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import {
  ScrollView, View,
  StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Swiper from 'react-native-swiper';
import { Card, Text } from 'react-native-elements';
import PlanningView from '../../../components/Planning/PlanningView';
import { getRecipe } from '../../../api/recipe';
import { getPlanning } from '../../../api/planning';
import { showRecipe } from '../../../actions/recipe';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  wrapper: {
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

class Planning extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    const promiseGetPlan = () => new Promise((resolve, reject) => {
      getPlanning(dispatch, resolve, reject);
    });
    promiseGetPlan().then(() => {
      const { allPlan } = this.props;
    });
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handlePressShowDetails(recipeId) {
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
    const { allPlan, planKey } = this.props;
    if (allPlan === null) return <Text />;
    return (
      <Swiper style={styles.wrapper} showsButtons={false} showPagination={false} loop={false}>
        {
          allPlan.day_meals.map(day => (
            <ScrollView>

              <View>
                {
                  Object.values(planKey).map(key => (
                    <TouchableWithoutFeedback onPress={() => this.handlePressShowDetails(day[key].id)}>
                      <View>
                        <Card
                          image={{ uri: day[key].image_url ? day[key].image_url : 'https://pngimage.net/wp-content/uploads/2018/06/not-found-png-3.png' }}
                        >
                          <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          >
                            <Text style={{ fontWeight: 'bold', color: colors.primaryOrange, fontSize: 20 }}>
                              {`${day[key].title}`}
                            </Text>
                          </View>
                        </Card>
                      </View>
                    </TouchableWithoutFeedback>
                  ))
                }
              </View>
            </ScrollView>
          ))
        }
      </Swiper>

    );
  }
}

Planning.defaultProps = {
  isLoading: true,
  currentRecipe: null,
  planKey: {
    midday_starter_recipe: 'midday_starter_recipe',
    midday_dish_recipe: 'midday_dish_recipe',
    midday_dessert_recipe: 'midday_dessert_recipe',
    evening_starter_recipe: 'evening_starter_recipe',
    evening_dish_recipe: 'evening_dish_recipe',
    evening_desert_recipe: 'evening_dish_recipe',
  },
  allPlan: null,
};


function mapStateToProps(state) {
  return {
    isLoadingRecip: state.recipe.isLoading,
    isLoading: state.planning.isLoading,
    currentRecipe: state.recipe.currentRecipe,
    planKey: state.planning.planKey,
    dayPlan: state.planning.dayPlan,
    allPlan: state.planning.allPlan,
  };
}

Planning.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentRecipe: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  planKey: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  allPlan: PropTypes.object,
};
export default connect(mapStateToProps)(Planning);
