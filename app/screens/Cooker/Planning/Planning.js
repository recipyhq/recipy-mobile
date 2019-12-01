/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import {
  ScrollView, View,
  StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Swiper from 'react-native-swiper';
import { Card, Divider, Text } from 'react-native-elements';
import { getRecipe } from '../../../api/recipe';
import {
  createPlanningList, generatePlanning, getPlanning, reloadPlanning,
} from '../../../api/planning';
import { showRecipe } from '../../../actions/recipe';
import colors from '../../../config/colors';
import style from '../../../components/Style/style';
import ButtonStd from '../../../components/Buttons/ButtonStd';
import Loader from '../../../components/Loaders/Loader/Loader';

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
    this.handleGetPlanning();
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handleGeneratePlanning() {
    const { dispatch } = this.props;

    const promiseGeneratePlan = () => new Promise((resolve, reject) => {
      generatePlanning(dispatch, resolve, reject);
    });
    promiseGeneratePlan().then(() => {
    });
  }

  handleGetPlanning() {
    const { dispatch } = this.props;

    const promiseGetPlan = () => new Promise((resolve, reject) => {
      getPlanning(dispatch, resolve, reject);
    });
    promiseGetPlan().then(() => {
    });
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

  handleReloadPlanning(id) {
    const { dispatch } = this.props;
    const promiseReloadPlan = () => new Promise((resolve, reject) => {
      reloadPlanning(dispatch, id, resolve, reject);
    });
    promiseReloadPlan().then(() => {
      this.handleGetPlanning();
    });
  }

  handleCreatePlanningList() {
    const { dispatch, navigation } = this.props;
    createPlanningList(dispatch, navigation);
  }

  render() {
    const { allPlan, planKey, planKeyTrad } = this.props;
    if (allPlan === null) {
      return (
        <View>
          <View style={style.buttonContainer}>
            <ButtonStd
              title="Générer mon planning pour la semaine"
              onPress={() => {
                this.handleGeneratePlanning();
              }}
              buttonStyle={style.btnSendForm}
              fontSize={15}
              color={colors.primaryWhite}
            />
          </View>
          <Loader isLoading={this.isLoading} />
        </View>
      );
    }
    return (
      <Swiper style={styles.wrapper} showsButtons={false} showPagination={false} loop={false}>
        {
          allPlan.day_meals.map(day => (
            <ScrollView>
              <Loader isLoading={this.isLoading} />
              <View style={style.buttonContainer}>
                <ButtonStd
                  title="Créer la liste de course du planning"
                  onPress={() => {
                    this.handleCreatePlanningList();
                  }}
                  buttonStyle={style.btnSendForm}
                  fontSize={15}
                  color={colors.primaryWhite}
                />
              </View>

              <View style={style.buttonContainer}>
                <ButtonStd
                  title="Regénérer le planning pour ce jour-ci"
                  onPress={() => {
                    this.handleReloadPlanning(day.id);
                  }}
                  buttonStyle={style.btnSendForm}
                  fontSize={15}
                  color={colors.primaryWhite}
                />
              </View>
              <Text style={{
                fontWeight: 'bold',
                color: colors.primaryGrey,
                fontSize: 25,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
              >
                {`${day.date.substring(0, 10)}`}
              </Text>
              <View>
                {
                  Object.values(planKey).map((key, index) => (
                    <TouchableWithoutFeedback
                      onPress={
                      () => this.handlePressShowDetails(day[key].id)
                    }
                    >
                      <View>
                        <Divider style={{ backgroundColor: 'black', marginTop: 20, height: 2 }} />
                        <Text style={{
                          fontWeight: 'bold', color: colors.primaryGrey, fontSize: 22, textAlign: 'center', marginTop: 11,
                        }}
                        >
                          {`${Object.values(planKeyTrad)[index]}`}
                        </Text>
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
                            <Text style={{
                              fontWeight: 'bold', color: colors.primaryOrange, fontSize: 16,
                            }}
                            >
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
  planKeyTrad: {
    midday_starter_recipe: 'Entrée pour midi',
    midday_dish_recipe: 'Plat pour midi',
    midday_dessert_recipe: 'Dessert pour midi',
    evening_starter_recipe: 'Entrée pour le soir',
    evening_dish_recipe: 'Plat pour le soir',
    evening_dessert_recipe: 'Dessert pour le soir',
  },
  allPlan: null,
};


function mapStateToProps(state) {
  return {
    isLoadingRecip: state.recipe.isLoading,
    isLoading: state.planning.isLoading,
    currentRecipe: state.recipe.currentRecipe,
    planKey: state.planning.planKey,
    planKeyTrad: state.planning.planKeyTrad,
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
  planKeyTrad: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  allPlan: PropTypes.object,
};
export default connect(mapStateToProps)(Planning);
