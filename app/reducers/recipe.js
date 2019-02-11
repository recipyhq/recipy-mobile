import {
  CHANGE_SEARCH_QUERY,
  GET_ALL_RECIPE_FAILURE,
  GET_ALL_RECIPE_REQUEST,
  GET_ALL_RECIPE_SUCCESS,
  SEARCH_RECIPE_FAILURE, SEARCH_RECIPE_REQUEST, SEARCH_RECIPE_SUCCESS,
  SHOW_RECIPE,
} from '../actions/recipe';

const initialState = {
  list: [],
  search: {
    q: '',
    ingredients: [],
    difficulty: 0,
    time: 0,
  },
  currentRecipe: null,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_QUERY:
      return {
        ...state,
        search: {
          ...state.search,
          q: action.search.q,
        },
      };
    case SEARCH_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_RECIPE_SUCCESS:
      return {
        ...state,
        list: action.resultList,
        isLoading: false,
      };
    case SEARCH_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case SHOW_RECIPE:
      return {
        ...state,
        currentRecipe: action.currentRecipe,
      };
    case GET_ALL_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_RECIPE_SUCCESS:
      return {
        ...state,
        list: action.resultList,
        isLoading: false,
      };
    case GET_ALL_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
