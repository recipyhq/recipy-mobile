import {
  GET_PLANNING_REQUEST,
  GET_PLANNING_SUCCESS,
  GET_PLANNING_FAILURE,
  ADD_RECIPE_IN_DAY_PLAN,
  ADD_RECIPE_IN_HEBDO_PLAN,
  EMPTY_DAY_PLAN,
} from "../actions/planning";

const initialState = {
  isLoading: false,
  allPlan: null,
  planKey: {
    midday_starter_recipe: 'midday_starter_recipe',
    midday_dish_recipe: 'midday_dish_recipe',
    midday_dessert_recipe: 'midday_dessert_recipe',
    evening_starter_recipe: 'evening_starter_recipe',
    evening_dish_recipe: 'evening_dish_recipe',
    evening_dessert_recipe: 'evening_dessert_recipe',
  },
  dayPlan: [],
  hebdoPlan: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLANNING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PLANNING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allPlan: action.currentPlanning,
      };
    case GET_PLANNING_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_RECIPE_IN_DAY_PLAN:
      return {
        ...state,
        dayPlan: state.dayPlan.concat(action.recipe),
      };
    case EMPTY_DAY_PLAN:
      return {
        ...state,
        dayPlan: [],
      };
    case ADD_RECIPE_IN_HEBDO_PLAN:
      return {
        ...state,
        hebdoPlan: state.hebdoPlan.concat(action.plan),
      };
    default:
      return state;
  }
};

export default reducer;
