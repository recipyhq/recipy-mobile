import {
  GET_PLANNING_REQUEST,
  GET_PLANNING_SUCCESS,
  GET_PLANNING_FAILURE,
  ADD_RECIPE_IN_DAY_PLAN,
} from '../actions/planning';

const initialState = {
  isLoading: false,
  plan: {
    midday_starter: 7,
    midday_dish: 5,
    midday_dessert: 2,
    evening_starter: 8,
    evening_dish: 6,
    evening_desert: 9,
  },
  dayPlan: [],
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
    default:
      return state;
  }
};

export default reducer;
