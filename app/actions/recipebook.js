import { Alert } from 'react-native';
import { refreshAuthCredentials } from './user';

export const GET_ALL_RECIPE_BOOK_REQUEST = 'GET_ALL_RECIPE_BOOK_REQUEST';
export const GET_ALL_RECIPE_BOOK_SUCCESS = 'GET_ALL_RECIPE_BOOK_SUCCESS';
export const GET_ALL_RECIPE_BOOK_FAILURE = 'GET_ALL_RECIPE_BOOK_FAILURE';

export const GET_RECIPE_BOOK_REQUEST = 'GET_RECIPE_BOOK_REQUEST';
export const GET_RECIPE_BOOK_SUCCESS = 'GET_RECIPE_BOOK_SUCCESS';
export const GET_RECIPE_BOOK_FAILURE = 'GET_RECIPE_BOOK_FAILURE';

export const SEARCH_RECIPE_BOOK_REQUEST = 'SEARCH_RECIPE_BOOK_REQUEST';
export const SEARCH_RECIPE_BOOK_SUCCESS = 'SEARCH_RECIPE_BOOK_SUCCESS';
export const SEARCH_RECIPE_BOOK_FAILURE = 'SEARCH_RECIPE_BOOK_FAILURE';

export const ADD_RECIPE_TO_RECIPE_BOOK_REQUEST = 'ADD_RECIPE_TO_RECIPE_BOOK_REQUEST';
export const ADD_RECIPE_TO_RECIPE_BOOK_SUCCESS = 'ADD_RECIPE_TO_RECIPE_BOOK_SUCCESS';
export const ADD_RECIPE_TO_RECIPE_BOOK_FAILURE = 'ADD_RECIPE_TO_RECIPE_BOOK_FAILURE';

export const REMOVE_RECIPE_TO_RECIPE_BOOK_REQUEST = 'REMOVE_RECIPE_TO_RECIPE_BOOK_REQUEST';
export const REMOVE_RECIPE_TO_RECIPE_BOOK_SUCCESS = 'REMOVE_RECIPE_TO_RECIPE_BOOK_SUCCESS';
export const REMOVE_RECIPE_TO_RECIPE_BOOK_FAILURE = 'REMOVE_RECIPE_TO_RECIPE_BOOK_FAILURE';

export const SHOW_RECIPE_BOOK = 'SHOW_RECIPE_BOOK';

export const getAllRecipeBookRequest = () => ({
  type: GET_ALL_RECIPE_BOOK_REQUEST,
});

export const getAllRecipeBookSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let resultBookList = [];
  if (response.data) resultBookList = response.data;

  return ({
    type: GET_ALL_RECIPE_BOOK_SUCCESS,
    resultBookList,
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
  let currentRecipeBook = [];
  if (response.data) currentRecipeBook = response.data;
  return ({
    type: GET_RECIPE_BOOK_SUCCESS,
    currentRecipeBook,
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

export const showRecipeBook = (navigation, currentRecipeBook) => {
  navigation.navigate('RecipeBookContent', { item: currentRecipeBook });
  return {
    type: SHOW_RECIPE_BOOK,
    currentRecipeBook,
  };
};

export const searchRecipeBookRequest = () => ({
  type: SEARCH_RECIPE_BOOK_REQUEST,
});

export const searchRecipeBookSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let resultList = [];
  const formatedList = [];
  if (response.data) {
    resultList = response.data;
    resultList.map(book => formatedList.push({ id: book.id, name: book.title }));
  }
  return {
    type: SEARCH_RECIPE_BOOK_SUCCESS,
    formatedList,
  };
};

export const searchRecipeBookFailure = () => {
  Alert.alert(
    'Recherche un ingredient',
    'Une erreur inconnue s\'est produite',
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return {
    type: SEARCH_RECIPE_BOOK_FAILURE,
  };
};

export const addRecipeToRecipeBookRequest = () => ({
  type: ADD_RECIPE_TO_RECIPE_BOOK_REQUEST,
});

export const addRecipeToRecipeBookSuccess = () => {
  Alert.alert(
    'L\'ajout dans le notebook a réussi',
    'La recette a bien été ajouté',
    [
      {
        text: 'Super !',
        onPress: () => {
        },
      },
    ],
    { cancelable: false },
  );
  return ({ type: ADD_RECIPE_TO_RECIPE_BOOK_SUCCESS });
};

export const addRecipeToRecipeBookFailure = () => {
  Alert.alert(
    'L\'ajout a échoué',
    'Une erreur s\'est produite pendant l\'ajout de la recette.',
    [
      {
        text: 'OK',
        onPress: () => {
        },
      },
    ],
    { cancelable: false },
  );
  return ({ type: ADD_RECIPE_TO_RECIPE_BOOK_FAILURE });
};

export const removeRecipeToRecipeBookRequest = () => ({
  type: ADD_RECIPE_TO_RECIPE_BOOK_REQUEST,
});

export const removeRecipeToRecipeBookSuccess = () => {
  Alert.alert(
    'La suppression de la recette dans le notebook a réussi',
    'La recette a pu être supprimé',
    [
      {
        text: 'OK',
        onPress: () => {
        },
      },
    ],
    { cancelable: false },
  );
  return ({ type: ADD_RECIPE_TO_RECIPE_BOOK_SUCCESS });
};

export const removeRecipeToRecipeBookFailure = () => {
  Alert.alert(
    'La suppression de la recette dans le notebook a échoué',
    'La recette n\'a pas pu être supprimé du notebook',
    [
      {
        text: 'OK',
        onPress: () => {
        },
      },
    ],
    { cancelable: false },
  );
  return ({ type: ADD_RECIPE_TO_RECIPE_BOOK_FAILURE });
};
