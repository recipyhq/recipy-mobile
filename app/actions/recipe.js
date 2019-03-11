import { Alert } from 'react-native';
import { refreshAuthCredentials } from './user';

// SEARCH RECIPE
export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export const SEARCH_RECIPE_REQUEST = 'SEARCH_RECIPE_REQUEST';
export const SEARCH_RECIPE_SUCCESS = 'SEARCH_RECIPE_SUCCESS';
export const SEARCH_RECIPE_FAILURE = 'SEARCH_RECIPE_FAILURE';

// SHOW_RECIPE
export const SHOW_RECIPE = 'SHOW_RECIPE';

// GET_RECIPE
export const GET_RECIPE_REQUEST = 'GET_RECIPE_REQUEST';
export const GET_RECIPE_SUCCESS = 'GET_RECIPE_SUCCESS';
export const GET_RECIPE_FAILURE = 'GET_RECIPE_FAILURE';

// GET_ALL_RECIPE
export const GET_ALL_RECIPE_REQUEST = 'GET_ALL_RECIPE_REQUEST';
export const GET_ALL_RECIPE_SUCCESS = 'GET_ALL_RECIPE_SUCCESS';
export const GET_ALL_RECIPE_FAILURE = 'GET_ALL_RECIPE_FAILURE';

// SHOPPING LIST MANIPULATION
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENT_LIST = 'ADD_INGREDIENT_LIST';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const CHANGE_INGREDIENT = 'CHANGE_INGREDIENT';


export const searchRecipeRequest = () => ({
  type: SEARCH_RECIPE_REQUEST,
});

export const searchRecipeSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let resultList = [];
  if (response.data.recipes) resultList = response.data.recipes;
  return {
    type: SEARCH_RECIPE_SUCCESS,
    resultList,
  };
};

export const searchRecipeFailure = () => {
  Alert.alert(
    'Réinitialisation du mot de passe',
    'Une erreur inconnue s\'est produite',
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return {
    type: SEARCH_RECIPE_FAILURE,
  };
};

export const changeSearchQuery = q => ({
  type: CHANGE_SEARCH_QUERY,
  search: {
    q,
  },
});

export const showRecipe = (navigation, recipe) => {
  navigation.navigate('RecipeDescription', { item: recipe });
  return {
    type: SHOW_RECIPE,
    currentRecipe: recipe,
  };
};

export const getAllRecipeRequest = () => ({
  type: GET_ALL_RECIPE_REQUEST,
});

export const getAllRecipeSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let resultList = [];
  if (response.data) resultList = response.data;
  return ({
    type: GET_ALL_RECIPE_SUCCESS,
    resultList,
  });
};

export const getAllRecipeFailure = (error) => {
  const { response } = error;
  Alert.alert(
    'Une erreur est survenue lors de la récupération des recette',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: GET_ALL_RECIPE_FAILURE });
};

export const getRecipeRequest = () => ({
  type: GET_RECIPE_REQUEST,
});

export const getRecipeSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let currentRecipe = [];
  if (response.data) currentRecipe = response.data;
  return ({
    type: GET_RECIPE_SUCCESS,
    currentRecipe,
  });
};

export const getRecipeFailure = (error) => {
  const { response } = error;
  Alert.alert(
    'Une erreur est survenue lors de la récupération de la recette',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: GET_RECIPE_FAILURE });
};

export const addIngredientToList = (ingredient) => {
  const ingre = [];
  ingre.push(ingredient);
  return ({
    type: ADD_INGREDIENT,
    ingre,
  });
};

export const addIngredientListToList = (list) => {
  let curList = [];
  curList = list;
  return ({
    type: ADD_INGREDIENT_LIST,
    curList,
  });
};

export const changeQuantity = quantity => ({
  type: CHANGE_QUANTITY,
  quantity,
});

export const changeIngredient = ingredient => ({
  type: CHANGE_INGREDIENT,
  ingredient,
});

export const deleteIngredient = index => ({
  type: DELETE_INGREDIENT,
  index,
});
