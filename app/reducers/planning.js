import {
  GET_PLANNING_REQUEST,
  GET_PLANNING_SUCCESS,
  GET_PLANNING_FAILURE,
  ADD_RECIPE_IN_DAY_PLAN,
  ADD_RECIPE_IN_HEBDO_PLAN,
  EMPTY_DAY_PLAN,
  CREATE_PLANNING_LIST_REQUEST,
  CREATE_PLANNING_LIST_SUCCESS,
  CREATE_PLANNING_LIST_FAILURE,
  RELOAD_PLANNING_REQUEST,
  RELOAD_PLANNING_SUCCESS,
  RELOAD_PLANNING_FAILURE,
} from '../actions/planning';

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
  planKeyTrad: {
    midday_starter_recipe: 'Entrée pour midi',
    midday_dish_recipe: 'Plat pour midi',
    midday_dessert_recipe: 'Dessert pour midi',
    evening_starter_recipe: 'Entrée pour le soir',
    evening_dish_recipe: 'Plat pour le soir',
    evening_dessert_recipe: 'Dessert pour le soir',
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
    case CREATE_PLANNING_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_PLANNING_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case CREATE_PLANNING_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case RELOAD_PLANNING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RELOAD_PLANNING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case RELOAD_PLANNING_FAILURE:
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
