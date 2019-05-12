import {
  GET_ALL_RECIPE_BOOK_REQUEST,
  GET_ALL_RECIPE_BOOK_SUCCESS,
  GET_ALL_RECIPE_BOOK_FAILURE,
  GET_RECIPE_BOOK_REQUEST,
  GET_RECIPE_BOOK_SUCCESS,
  GET_RECIPE_BOOK_FAILURE,
  SHOW_RECIPE_BOOK,
  SEARCH_RECIPE_BOOK_FAILURE,
  SEARCH_RECIPE_BOOK_REQUEST,
  SEARCH_RECIPE_BOOK_SUCCESS,
  ADD_RECIPE_TO_RECIPE_BOOK_REQUEST,
  ADD_RECIPE_TO_RECIPE_BOOK_SUCCESS,
  ADD_RECIPE_TO_RECIPE_BOOK_FAILURE,
  REMOVE_RECIPE_TO_RECIPE_BOOK_REQUEST,
  REMOVE_RECIPE_TO_RECIPE_BOOK_SUCCESS,
  REMOVE_RECIPE_TO_RECIPE_BOOK_FAILURE,
  CREATE_RECIPE_BOOK_REQUEST,
  CREATE_RECIPE_BOOK_SUCCESS,
  CREATE_RECIPE_BOOK_FAILURE,
  CHANGE_TITLE,
  CHANGE_DESCRIPTION,
} from '../actions/recipebook';

const initialState = {
  resultBookList: [],
  searchBookList: [],
  currentRecipeBook: null,
  isLoading: false,
  search: {
    q: '',
    notebooks: [],
  },
  recipeBookTitleCreation: '',
  recipeBookDescriptionCreation: '',
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
        resultBookList: action.resultBookList,
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
        currentRecipeBook: action.currentRecipeBook,
      };
    case GET_RECIPE_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case SHOW_RECIPE_BOOK:
      return {
        ...state,
        currentRecipeBook: action.currentRecipeBook,
      };
    case SEARCH_RECIPE_BOOK_REQUEST:
      return {
        ...state,
      };
    case SEARCH_RECIPE_BOOK_SUCCESS:
      return {
        ...state,
        searchBookList: action.formatedList,
      };
    case SEARCH_RECIPE_BOOK_FAILURE:
      return {
        ...state,
      };
    case ADD_RECIPE_TO_RECIPE_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,

      };
    case ADD_RECIPE_TO_RECIPE_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,

      };
    case ADD_RECIPE_TO_RECIPE_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case REMOVE_RECIPE_TO_RECIPE_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,

      };
    case REMOVE_RECIPE_TO_RECIPE_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,

      };
    case REMOVE_RECIPE_TO_RECIPE_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case CHANGE_TITLE:
      return {
        ...state,
        recipeBookTitleCreation: action.title,
      };
    case CHANGE_DESCRIPTION:
      return {
        ...state,
        recipeBookDescriptionCreation: action.description,
      };
    case CREATE_RECIPE_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,

      };
    case CREATE_RECIPE_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,

      };
    case CREATE_RECIPE_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
