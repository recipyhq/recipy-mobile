/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import {
  ScrollView, View,
  StyleSheet,
} from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Swiper from 'react-native-swiper';
import { Text } from 'react-native-elements';
import PlanningView from '../../../components/Planning/PlanningView';
import { getRecipe } from '../../../api/recipe';
import { addRecipeInDayPlan } from '../../../actions/planning';

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
    this.handleRetrieveRecipe(7);
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handleRetrieveRecipe(recipeId) {
    const { dispatch, plan } = this.props;
    Object.keys(plan).map((key) => {
      const promiseGetRecipe = id => new Promise((resolve, reject) => {
        getRecipe(dispatch, id, resolve, reject);
      });
      promiseGetRecipe(plan[key]).then(() => {
        const { currentRecipe } = this.props;
        dispatch(addRecipeInDayPlan(currentRecipe));
      });
    });
  }

  render() {
    const { dayPlan } = this.props;
    if (Object.keys(dayPlan).length !== 6) return <Text />;
    return (
      <Swiper style={styles.wrapper} showsButtons={false} showPagination={false} loop={false}>
        <ScrollView>
          <PlanningView dayPlan={dayPlan} />
        </ScrollView>
      </Swiper>
    );
  }
}

Planning.defaultProps = {
  isLoading: true,
  currentRecipe: null,
  plan: {
    midday_starter: 7,
    midday_dish: 5,
    midday_dessert: 7,
    evening_starter: 7,
    evening_dish: 5,
    evening_desert: 5,
  },
  dayPlan: [],
};


function mapStateToProps(state) {
  return {
    isLoading: state.planning.isLoading,
    currentRecipe: state.recipe.currentRecipe,
    plan: state.planning.plan,
    dayPlan: state.planning.dayPlan,
  };
}

Planning.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentRecipe: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  plan: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  dayPlan: PropTypes.array,
};
export default connect(mapStateToProps)(Planning);
