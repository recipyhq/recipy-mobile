import {
  CHANGE_SEARCH_QUERY,
  GET_ALL_RECIPE_FAILURE,
  GET_ALL_RECIPE_REQUEST,
  GET_ALL_RECIPE_SUCCESS, GET_RECIPE_FAILURE, GET_RECIPE_REQUEST, GET_RECIPE_SUCCESS,
  SEARCH_RECIPE_FAILURE, SEARCH_RECIPE_REQUEST, SEARCH_RECIPE_SUCCESS,
  SHOW_RECIPE, ADD_INGREDIENT, ADD_INGREDIENT_LIST,
  CHANGE_QUANTITY, CHANGE_INGREDIENT, DELETE_INGREDIENT,
} from '../actions/recipe';

const initialState = {
  list: [],
  shoplist: [],
  shoplistQuantity: '',
  shoplistIngredient: '',
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
      };
    case GET_ALL_RECIPE_SUCCESS:
      return {
        ...state,
        list: action.resultList,
      };
    case GET_ALL_RECIPE_FAILURE:
      return {
        ...state,
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
    case ADD_INGREDIENT:
      return {
        ...state,
        shoplist: state.shoplist.concat(action.ingre),
      };
    case ADD_INGREDIENT_LIST:
      return {
        ...state,
        shoplist: action.curList,
      };
    case CHANGE_QUANTITY:
      return {
        ...state,
        shoplistQuantity: action.quantity,
      };
    case CHANGE_INGREDIENT:
      return {
        ...state,
        shoplistIngredient: action.ingredient,
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        shoplist: state.shoplist.slice(action.index + 1),
      };
    default:
      return state;
  }
};

export default reducer;
