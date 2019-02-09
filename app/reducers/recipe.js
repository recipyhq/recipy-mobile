import {
  CHANGE_SEARCH_QUERY,
  SEARCH_RECIPE_FAILURE,
  SEARCH_RECIPE_REQUEST,
  SEARCH_RECIPE_SUCCESS,
} from '../actions/recipe';

const initialState = {
  list: [],
  search: {
    q: '',
    ingredients: [],
    difficulty: 0,
    time: 0,
  },
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
    default:
      return state;
  }
};

export default reducer;
