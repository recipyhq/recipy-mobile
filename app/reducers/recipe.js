import {
  CHANGE_SEARCH_QUERY,
  GET_MY_RECIPE_LIST_FAILURE,
  GET_MY_RECIPE_LIST_REQUEST,
  GET_MY_RECIPE_LIST_SUCCESS, GET_PROFILE_RECIPES_FAILURE,
  GET_PROFILE_RECIPES_REQUEST,
  GET_PROFILE_RECIPES_SUCCESS,
  GET_RECIPE_FAILURE,
  GET_RECIPE_REQUEST,
  GET_RECIPE_SUCCESS,
  SEARCH_RECIPE_FAILURE,
  SEARCH_RECIPE_REQUEST,
  SEARCH_RECIPE_SUCCESS,
  SHOW_RECIPE,
} from '../actions/recipe';

const initialState = {
  searchList: [],
  myRecipeList: [],
  profileRecipes: [],
  profileRecipesErrorText: '',
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
      };
    case SEARCH_RECIPE_SUCCESS:
      return {
        ...state,
        searchList: action.resultList,
      };
    case SEARCH_RECIPE_FAILURE:
      return {
        ...state,
        searchList: [],
      };
    case SHOW_RECIPE:
      return {
        ...state,
        currentRecipe: action.currentRecipe,
      };
    case GET_MY_RECIPE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MY_RECIPE_LIST_SUCCESS:
      return {
        ...state,
        myRecipeList: action.resultList,
        isLoading: false,
      };
    case GET_MY_RECIPE_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_RECIPE_SUCCESS:
      return {
        ...state,
        currentRecipe: action.currentRecipe,
        isLoading: false,
      };
    case GET_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_PROFILE_RECIPES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROFILE_RECIPES_SUCCESS:
      return {
        ...state,
        profileRecipes: action.profileRecipes,
        isLoading: false,
        profileRecipesErrorText: '',
      };
    case GET_PROFILE_RECIPES_FAILURE:
      return {
        ...state,
        isLoading: false,
        profileRecipesErrorText: action.errorText,
      };
    default:
      return state;
  }
};

export default reducer;
