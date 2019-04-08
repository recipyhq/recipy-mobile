import { Alert } from 'react-native';
import { refreshAuthCredentials } from './user';

export const GET_ALL_RECIPE_BOOK_REQUEST = 'GET_ALL_RECIPE_BOOK_REQUEST';
export const GET_ALL_RECIPE_BOOK_SUCCESS = 'GET_ALL_RECIPE_BOOK_SUCCESS';
export const GET_ALL_RECIPE_BOOK_FAILURE = 'GET_ALL_RECIPE_BOOK_FAILURE';

export const GET_RECIPE_BOOK_REQUEST = 'GET_RECIPE_BOOK_REQUEST';
export const GET_RECIPE_BOOK_SUCCESS = 'GET_RECIPE_BOOK_SUCCESS';
export const GET_RECIPE_BOOK_FAILURE = 'GET_RECIPE_BOOK_FAILURE';

export const getAllRecipeBookRequest = () => ({
  type: GET_ALL_RECIPE_BOOK_REQUEST,
});

export const getAllRecipeBookSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let resultShoppingList = [];
  // TODO Changer la l'assignement de variable
  if (response.data) resultShoppingList = response.data;
  return ({
    type: GET_ALL_RECIPE_BOOK_SUCCESS,
    resultShoppingList,
  });
};

export const getAllRecipeBookFailure = (error) => {
  const { response } = error;
  Alert.alert(
    'Une erreur est survenue lors de la récupération des carnets de recettes',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: GET_ALL_RECIPE_BOOK_FAILURE });
};


export const getRecipeBookRequest = () => ({
  type: GET_RECIPE_BOOK_REQUEST,
});

export const getRecipeBookSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let resultShoppingList = [];
  // TODO Changer la l'assignement de variable
  if (response.data) resultShoppingList = response.data;
  return ({
    type: GET_RECIPE_BOOK_SUCCESS,
    resultShoppingList,
  });
};

export const getRecipeBookFailure = (error) => {
  const { response } = error;
  Alert.alert(
    'Une erreur est survenue lors de la récupération du carnet de recette',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: GET_RECIPE_BOOK_FAILURE });
};
