import { Alert } from 'react-native';
import { refreshAuthCredentials } from './user';

// SEARCH RECIPE
export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export const SEARCH_RECIPE_REQUEST = 'SEARCH_RECIPE_REQUEST';
export const SEARCH_RECIPE_SUCCESS = 'SEARCH_RECIPE_SUCCESS';
export const SEARCH_RECIPE_FAILURE = 'SEARCH_RECIPE_FAILURE';

// SHOW_RECIPE
export const SHOW_RECIPE = 'SHOW_RECIPE';

// Get_ALL_RECIPE
export const GET_ALL_RECIPE_REQUEST = 'GET_ALL_RECIPE_REQUEST';
export const GET_ALL_RECIPE_SUCCESS = 'GET_ALL_RECIPE_SUCCESS';
export const GET_ALL_RECIPE_FAILURE = 'GET_ALL_RECIPE_FAILURE';

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
  navigation.navigate('RecipeDescription', { item: this.recipe });
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
