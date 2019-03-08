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

// GET_USER_RECIPES
export const GET_PROFILE_RECIPES_REQUEST = 'GET_PROFILE_RECIPES_REQUEST';
export const GET_PROFILE_RECIPES_SUCCESS = 'GET_PROFILE_RECIPES_SUCCESS';
export const GET_PROFILE_RECIPES_FAILURE = 'GET_PROFILE_RECIPES_FAILURE';

// GET_ALL_RECIPE
export const GET_MY_RECIPE_LIST_REQUEST = 'GET_MY_RECIPE_LIST_REQUEST';
export const GET_MY_RECIPE_LIST_SUCCESS = 'GET_MY_RECIPE_LIST_SUCCESS';
export const GET_MY_RECIPE_LIST_FAILURE = 'GET_MY_RECIPE_LIST_FAILURE';

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

export const getMyRecipeListRequest = () => ({
  type: GET_MY_RECIPE_LIST_REQUEST,
});

export const getMyRecipeListSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let resultList = [];
  if (response.data) resultList = response.data;
  return ({
    type: GET_MY_RECIPE_LIST_SUCCESS,
    resultList,
  });
};

export const getMyRecipeListFailure = (error) => {
  const { response } = error;
  Alert.alert(
    'Une erreur est survenue lors de la récupération des recette',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: GET_MY_RECIPE_LIST_FAILURE });
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

export const getProfileRecipesRequest = () => ({
  type: GET_PROFILE_RECIPES_REQUEST,
});

export const getProfileRecipesSuccess = (response) => {
  let ProfileRecipes = [];
  if (response.data) ProfileRecipes = response.data;
  return {
    type: GET_PROFILE_RECIPES_SUCCESS,
    ProfileRecipes,
  };
};

export const getProfileRecipesFailure = () => ({
  type: GET_PROFILE_RECIPES_FAILURE,
  errorText: 'Une erreur est survenue pendant la récupération de la liste des recettes de l\'utilisateur',
});
