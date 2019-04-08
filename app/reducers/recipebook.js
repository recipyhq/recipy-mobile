import {
  GET_ALL_RECIPE_BOOK_REQUEST,
  GET_ALL_RECIPE_BOOK_SUCCESS,
  GET_ALL_RECIPE_BOOK_FAILURE,
  GET_RECIPE_BOOK_REQUEST,
  GET_RECIPE_BOOK_SUCCESS,
  GET_RECIPE_BOOK_FAILURE,
} from '../actions/recipebook';

const initialState = {
  recipeBookList: [],
  currentRecipeBook: null,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPE_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_RECIPE_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case GET_ALL_RECIPE_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_RECIPE_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_RECIPE_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case GET_RECIPE_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
