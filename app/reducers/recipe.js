import {
  CHANGE_SEARCH_QUERY,
  GET_RECIPE_FAILURE, GET_RECIPE_REQUEST, GET_RECIPE_SUCCESS,
  SEARCH_RECIPE_FAILURE, SEARCH_RECIPE_REQUEST, SEARCH_RECIPE_SUCCESS,
  SHOW_RECIPE, ADD_INGREDIENT, ADD_INGREDIENT_LIST,
  CHANGE_TITLE, CHANGE_QUANTITY, CHANGE_INGREDIENT, DELETE_INGREDIENT, CHANGE_INGREDIENT_TEXT,
  GET_ALL_SHOPPING_LIST_REQUEST, GET_ALL_SHOPPING_LIST_SUCCESS, GET_ALL_SHOPPING_LIST_FAILURE,
  GET_SHOPPING_LIST_REQUEST, GET_SHOPPING_LIST_SUCCESS, GET_SHOPPING_LIST_FAILURE,
  CREATE_SHOPPING_LIST_REQUEST, CREATE_SHOPPING_LIST_SUCCESS, CREATE_SHOPPING_LIST_FAILURE,
  DELETE_SHOPPING_LIST_REQUEST, DELETE_SHOPPING_LIST_SUCCESS, DELETE_SHOPPING_LIST_FAILURE,
  SHOW_SHOPPING_LIST, SEARCH_INGREDIENT_REQUEST,
  SEARCH_INGREDIENT_FAILURE, SEARCH_INGREDIENT_SUCCESS,
  GET_USER_RECIPE_LIST_FAILURE,
  GET_USER_RECIPE_LIST_REQUEST,
  GET_USER_RECIPE_LIST_SUCCESS, GET_PROFILE_RECIPES_FAILURE,
  GET_PROFILE_RECIPES_REQUEST,
  GET_PROFILE_RECIPES_SUCCESS,
  UPDATE_INGREDIENT_LIST,
  SHOW_CREATE_RECIPE_ADVICE_FORM,
  HIDE_CREATE_RECIPE_ADVICE_FORM,
  CHANGE_USER_RECIPE_MARK,
  CHANGE_USER_RECIPE_COMMENT,
  CHANGE_BOOK_MODAL_VISIBLE,
  CHANGE_LIST_MODAL_VISIBLE,
  CHANGE_LIST_MODAL_TEXT,
  CHANGE_LIST_MODAL_ITEM,
  UPDATE_SHOPPING_LIST_REQUEST,
  UPDATE_SHOPPING_LIST_SUCCESS,
  UPDATE_SHOPPING_LIST_FAILURE,
  UPDATE_CHECKBOX_REQUEST,
  UPDATE_CHECKBOX_SUCCESS,
  UPDATE_CHECKBOX_FAILURE,
  IS_REFRESHING,
  SEARCH_QUANTITY_TYPE_SUCCESS,
  SEARCH_QUANTITY_TYPE_REQUEST,
  SEARCH_QUANTITY_TYPE_FAILURE,
  CHANGE_AMOUNT, ERROR_DISPLAY,
} from '../actions/recipe';

const initialState = {
  allIngredientList: [],
  allQuantityList: [],
  ingredientList: [],
  allShopListItems: [],
  shoplist: [],
  shoplistTitle: '',
  shoplistIngredientText: '',
  shoplistQuantity: '',
  shoplistQuantityType: '',
  shoplistIngredient: null,
  shoplistAmount: '',
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
  currentShoppingList: null,
  displayRecipeAdviceModal: false,
  bookModalVisible: false,
  listModalVisible: false,
  listModalText: '',
  listModalItem: null,
  isLoading: false,
  userAdvice: null,
  isRefreshing: false,
  checkbox: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_REFRESHING:
      return {
        ...state,
        isRefreshing: action.refresh,
      };
    case ERROR_DISPLAY:
      return {
        ...state,
        isLoading: false,
      };
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
        searchList: action.resultList,
        isLoading: false,
      };
    case SEARCH_RECIPE_FAILURE:
      return {
        ...state,
        searchList: [],
        isLoading: false,
      };
    case SEARCH_INGREDIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_INGREDIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allIngredientList: action.formatedList.sort((a, b) => a.name.localeCompare(b.name)),
      };
    case SEARCH_INGREDIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case SEARCH_QUANTITY_TYPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_QUANTITY_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allQuantityList: action.quantityList.sort((a, b) => a.name.localeCompare(b.name)),
      };
    case SEARCH_QUANTITY_TYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case SHOW_RECIPE:
      return {
        ...state,
        currentRecipe: action.currentRecipe,
      };
    case GET_USER_RECIPE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_RECIPE_LIST_SUCCESS:
      return {
        ...state,
        myRecipeList: action.resultList,
        isLoading: false,
      };
    case GET_USER_RECIPE_LIST_FAILURE:
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
    case ADD_INGREDIENT:
      return {
        ...state,
        shoplist: state.shoplist.concat(action.elem),
      };
    case ADD_INGREDIENT_LIST:
      return {
        ...state,
        shoplist: action.curList,
      };
    case UPDATE_INGREDIENT_LIST:
      return {
        ...state,
        ingredientList: state.ingredientList.concat(action.listIngr),
      };
    case CHANGE_TITLE:
      return {
        ...state,
        shoplistTitle: action.title,
      };
    case CHANGE_QUANTITY:
      return {
        ...state,
        shoplistQuantity: action.quantity,
      };
    case CHANGE_AMOUNT:
      return {
        ...state,
        shoplistAmount: action.amount,
      };
    case CHANGE_INGREDIENT_TEXT:
      return {
        ...state,
        shoplistIngredientText: action.text,
      };
    case CHANGE_INGREDIENT:
      return {
        ...state,
        shoplistIngredient: action.ingredient,
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        shoplist: state.shoplist.filter((_, i) => i !== action.index),
      };
    case GET_ALL_SHOPPING_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        allShopListItems: action.resultShoppingList,
        isLoading: false,
      };
    case GET_ALL_SHOPPING_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_SHOPPING_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        currentShoppingList: action.resultShoppingListItem,
        isLoading: false,
      };
    case GET_SHOPPING_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case SHOW_SHOPPING_LIST:
      return {
        ...state,
        currentShoppingList: action.currentShoppingList,
      };
    case CREATE_SHOPPING_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,

      };
    case CREATE_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,

      };
    case CREATE_SHOPPING_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_SHOPPING_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,

      };
    case UPDATE_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,

      };
    case UPDATE_SHOPPING_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_CHECKBOX_REQUEST:
      return {
        ...state,
        isLoading: true,

      };
    case UPDATE_CHECKBOX_SUCCESS:
      return {
        ...state,
        isLoading: false,
        checkbox: !state.checkbox,
      };
    case UPDATE_CHECKBOX_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_SHOPPING_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_SHOPPING_LIST_FAILURE:
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
    case SHOW_CREATE_RECIPE_ADVICE_FORM:
      return {
        ...state,
        displayRecipeAdviceModal: true,
      };
    case HIDE_CREATE_RECIPE_ADVICE_FORM:
      return {
        ...state,
        displayRecipeAdviceModal: false,
      };
    case CHANGE_USER_RECIPE_MARK:
      return {
        ...state,
        userAdvice: {
          ...state.userAdvice,
          mark: action.userRecipeMark,
        },
      };
    case CHANGE_USER_RECIPE_COMMENT:
      return {
        ...state,
        userAdvice: {
          ...state.userAdvice,
          comment: action.userRecipeComment,
        },
      };
    case CHANGE_BOOK_MODAL_VISIBLE:
      return {
        ...state,
        bookModalVisible: action.visible,
      };
    case CHANGE_LIST_MODAL_VISIBLE:
      return {
        ...state,
        listModalVisible: action.visible,
      };
    case CHANGE_LIST_MODAL_TEXT:
      return {
        ...state,
        listModalText: action.text,
      };
    case CHANGE_LIST_MODAL_ITEM:
      return {
        ...state,
        listModalItem: action.item,
      };
    default:
      return state;
  }
};

export default reducer;
