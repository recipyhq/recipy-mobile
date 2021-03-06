import { Alert } from 'react-native';
import { refreshAuthCredentials } from './user';

export const IS_REFRESHING = 'IS_REFRESHING';
export const ERROR_DISPLAY = 'ERROR_DISPLAY';

// SEARCH RECIPE
export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export const SEARCH_RECIPE_REQUEST = 'SEARCH_RECIPE_REQUEST';
export const SEARCH_RECIPE_SUCCESS = 'SEARCH_RECIPE_SUCCESS';
export const SEARCH_RECIPE_FAILURE = 'SEARCH_RECIPE_FAILURE';

// SEARCH INGREDIENT
export const SEARCH_INGREDIENT_REQUEST = 'SEARCH_INGREDIENT_REQUEST';
export const SEARCH_INGREDIENT_SUCCESS = 'SEARCH_INGREDIENT_SUCCESS';
export const SEARCH_INGREDIENT_FAILURE = 'SEARCH_INGREDIENT_FAILURE';

// QUANTITY TYPE INGREDIENT
export const SEARCH_QUANTITY_TYPE_REQUEST = 'SEARCH_QUANTITY_TYPE_REQUEST';
export const SEARCH_QUANTITY_TYPE_SUCCESS = 'SEARCH_QUANTITY_TYPE_SUCCESS';
export const SEARCH_QUANTITY_TYPE_FAILURE = 'SEARCH_QUANTITY_TYPE_FAILURE';

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

// GET_USER_RECIPE_LIST
export const GET_USER_RECIPE_LIST_REQUEST = 'GET_USER_RECIPE_LIST_REQUEST';
export const GET_USER_RECIPE_LIST_SUCCESS = 'GET_USER_RECIPE_LIST_SUCCESS';
export const GET_USER_RECIPE_LIST_FAILURE = 'GET_USER_RECIPE_LIST_FAILURE';

// SHOPPING LIST MANIPULATION
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENT_LIST = 'ADD_INGREDIENT_LIST';
export const UPDATE_INGREDIENT_LIST = 'UPDATE_INGREDIENT_LIST';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const CHANGE_INGREDIENT_TEXT = 'CHANGE_INGREDIENT_TEXT';
export const CHANGE_INGREDIENT = 'CHANGE_INGREDIENT';
export const CHANGE_AMOUNT = 'CHANGE_AMOUNT';

// SHOPPING LIST API CALL
export const GET_ALL_SHOPPING_LIST_REQUEST = 'GET_ALL_SHOPPING_LIST_REQUEST';
export const GET_ALL_SHOPPING_LIST_SUCCESS = 'GET_ALL_SHOPPING_LIST_SUCCESS';
export const GET_ALL_SHOPPING_LIST_FAILURE = 'GET_ALL_SHOPPING_LIST_FAILURE';

export const GET_SHOPPING_LIST_REQUEST = 'GET_SHOPPING_LIST_REQUEST';
export const GET_SHOPPING_LIST_SUCCESS = 'GET_SHOPPING_LIST_SUCCESS';
export const GET_SHOPPING_LIST_FAILURE = 'GET_SHOPPING_LIST_FAILURE';

export const CREATE_SHOPPING_LIST_REQUEST = 'CREATE_SHOPPING_LIST_REQUEST';
export const CREATE_SHOPPING_LIST_SUCCESS = 'CREATE_SHOPPING_LIST_SUCCESS';
export const CREATE_SHOPPING_LIST_FAILURE = 'CREATE_SHOPPING_LIST_FAILURE';

export const UPDATE_SHOPPING_LIST_REQUEST = 'UPDATE_SHOPPING_LIST_REQUEST';
export const UPDATE_SHOPPING_LIST_SUCCESS = 'UPDATE_SHOPPING_LIST_SUCCESS';
export const UPDATE_SHOPPING_LIST_FAILURE = 'UPDATE_SHOPPING_LIST_FAILURE';

export const UPDATE_CHECKBOX_REQUEST = 'UPDATE_CHECKBOX_REQUEST';
export const UPDATE_CHECKBOX_SUCCESS = 'UPDATE_CHECKBOX_SUCCESS';
export const UPDATE_CHECKBOX_FAILURE = 'UPDATE_CHECKBOX_FAILURE';

export const DELETE_SHOPPING_LIST_REQUEST = 'DELETE_SHOPPING_LIST_REQUEST';
export const DELETE_SHOPPING_LIST_SUCCESS = 'DELETE_SHOPPING_LIST_SUCCESS';
export const DELETE_SHOPPING_LIST_FAILURE = 'DELETE_SHOPPING_LIST_FAILURE';

export const SHOW_SHOPPING_LIST = 'SHOW_SHOPPING_LIST';

// RECIPE ADVICES
export const SHOW_CREATE_RECIPE_ADVICE_FORM = 'SHOW_RECIPE_ADVICE_FORM';
export const HIDE_CREATE_RECIPE_ADVICE_FORM = 'HIDE_CREATE_RECIPE_ADVICE_FORM';
export const CHANGE_LIST_MODAL_VISIBLE = 'CHANGE_LIST_MODAL_VISIBLE';
export const CHANGE_LIST_MODAL_TEXT = 'CHANGE_LIST_MODAL_TEXT';
export const CHANGE_LIST_MODAL_ITEM = 'CHANGE_LIST_MODAL_ITEM';
export const CHANGE_BOOK_MODAL_VISIBLE = 'CHANGE_BOOK_MODAL_VISIBLE';


export const handleRefresh = refresh => ({
  type: IS_REFRESHING,
  refresh,
});
export const CHANGE_USER_RECIPE_MARK = 'CHANGE_USER_RECIPE_MARK';
export const CHANGE_USER_RECIPE_COMMENT = 'CHANGE_USER_RECIPE_COMMENT';
export const SAVE_RECIPE_ADVICE_REQUEST = 'SAVE_RECIPE_ADVICE_REQUEST';
export const SAVE_RECIPE_ADVICE_SUCCESS = 'SAVE_RECIPE_ADVICE_SUCCESS';
export const SAVE_RECIPE_ADVICE_FAILURE = 'SAVE_RECIPE_ADVICE_FAILURE';

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
    'Recherche d\'une recette',
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

export const searchIngredientRequest = () => ({
  type: SEARCH_INGREDIENT_REQUEST,
});

export const searchIngredientSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let resultList = [];
  const formatedList = [];
  if (response.data.ingredients) {
    resultList = response.data.ingredients;
    resultList.map(recipe => formatedList.push({ id: recipe[1], name: recipe[0] }));
  }
  return {
    type: SEARCH_INGREDIENT_SUCCESS,
    formatedList,
  };
};

export const searchIngredientFailure = () => {
  Alert.alert(
    'Recherche un ingredient',
    'Une erreur inconnue s\'est produite',
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return {
    type: SEARCH_INGREDIENT_FAILURE,
  };
};

export const searchQuantityTypeRequest = () => ({
  type: SEARCH_QUANTITY_TYPE_REQUEST,
});

export const searchQuantityTypeSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let resultList = [];
  const quantityList = [];
  if (response.data) {
    resultList = response.data;
    resultList.map(quantity => quantityList.push({ id: quantity.id, name: quantity.name }));
  }
  return {
    type: SEARCH_QUANTITY_TYPE_SUCCESS,
    quantityList,
  };
};

export const searchQuantityTypeFailure = (error) => {
  Alert.alert(
    'Recherche une quantité',
    `Une erreur inconnue s'est produite${error.response}`,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return {
    type: SEARCH_QUANTITY_TYPE_FAILURE,
  };
};
export const showRecipe = (navigation, recipe) => {
  navigation.navigate('RecipeDescription', { item: recipe });
  return {
    type: SHOW_RECIPE,
    currentRecipe: recipe,
  };
};

export const GetUserRecipeListRequest = () => ({
  type: GET_USER_RECIPE_LIST_REQUEST,
});

export const GetUserRecipeListSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let resultList = [];
  if (response.data) resultList = response.data;
  return ({
    type: GET_USER_RECIPE_LIST_SUCCESS,
    resultList,
  });
};

export const GetUserRecipeListFailure = (error) => {
  const { response } = error;
  Alert.alert(
    'Une erreur est survenue lors de la récupération des recette',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: GET_USER_RECIPE_LIST_FAILURE });
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

export const addIngredientToList = (quantity, quantityType, ingredient) => {
  const elem = {
    quantity,
    quantityType,
    ingredient,
  };
  return ({
    type: ADD_INGREDIENT,
    elem,
  });
};

export const updateIngredientList = (listIngr) => {
  listIngr.sort((a, b) => a.name.localeCompare(b.name));
  return ({
    type: UPDATE_INGREDIENT_LIST,
    listIngr,
  });
};
export const addIngredientListToList = list => ({
  type: ADD_INGREDIENT_LIST,
  curList: list,
});

export const changeTitle = title => ({
  type: CHANGE_TITLE,
  title,
});

export const changeQuantity = quantity => ({
  type: CHANGE_QUANTITY,
  quantity,
});

export const changeIngredientText = text => ({
  type: CHANGE_INGREDIENT_TEXT,
  text,
});

export const changeIngredient = ingredient => ({
  type: CHANGE_INGREDIENT,
  ingredient,
});

export const changeAmount = amount => ({
  type: CHANGE_AMOUNT,
  amount,
});

export const deleteIngredient = index => ({
  type: DELETE_INGREDIENT,
  index,
});


export const getAllShoppingListRequest = () => ({
  type: GET_ALL_SHOPPING_LIST_REQUEST,
});

export const getAllShoppingListSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let resultShoppingList = [];
  if (response.data) resultShoppingList = response.data;
  return ({
    type: GET_ALL_SHOPPING_LIST_SUCCESS,
    resultShoppingList,
  });
};

export const getAllShoppingListFailure = () => ({ type: GET_ALL_SHOPPING_LIST_FAILURE });

export const getShoppingListRequest = () => ({
  type: GET_SHOPPING_LIST_REQUEST,
});

export const getShoppingListSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let resultShoppingListItem = [];
  if (response.data) {
    resultShoppingListItem = response.data;
  }
  return ({
    type: GET_SHOPPING_LIST_SUCCESS,
    resultShoppingListItem,
  });
};

export const getShoppingListFailure = (error) => {
  const { response } = error;
  Alert.alert(
    'Une erreur est survenue lors de la récupération de la liste de course',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: GET_SHOPPING_LIST_FAILURE });
};
export const showShoppingList = (navigation, list) => {
  navigation.navigate('ShoppingListConsult', { item: list });
  return {
    type: SHOW_SHOPPING_LIST,
    currentShoppingList: list,
  };
};

export const createShoppingListRequest = () => ({
  type: CREATE_SHOPPING_LIST_REQUEST,
});

export const createShoppingListSuccess = () => ({
  type: CREATE_SHOPPING_LIST_SUCCESS,
});

export const createShoppingListFailure = () => {
  Alert.alert(
    'La création à échoué',
    'Une erreur s\'est produite pendant la création de la liste',
    [
      {
        text: 'OK',
        onPress: () => {
        },
      },
    ],
    { cancelable: false },
  );
  return ({ type: CREATE_SHOPPING_LIST_FAILURE });
};

export const updateShoppingListRequest = () => ({
  type: UPDATE_SHOPPING_LIST_REQUEST,
});

export const updateShoppingListSuccess = () => ({
  type: UPDATE_SHOPPING_LIST_SUCCESS,
});

export const updateShoppingListFailure = () => {
  Alert.alert(
    'La modification à échoué',
    'Une erreur s\'est produite pendant la modification de la liste',
    [
      {
        text: 'OK',
        onPress: () => {
        },
      },
    ],
    { cancelable: false },
  );
  return ({ type: UPDATE_SHOPPING_LIST_FAILURE });
};

export const updateCheckboxRequest = () => ({
  type: UPDATE_CHECKBOX_REQUEST,
});

export const updateCheckboxSuccess = () => ({
  type: UPDATE_CHECKBOX_SUCCESS,
});

export const updateCheckboxFailure = () => {
  Alert.alert(
    'La modification à échoué',
    'Une erreur s\'est produite pendant la modification de la liste',
    [
      {
        text: 'OK',
        onPress: () => {
        },
      },
    ],
    { cancelable: false },
  );
  return ({ type: UPDATE_CHECKBOX_FAILURE });
};

export const deleteShoppingListRequest = () => ({
  type: DELETE_SHOPPING_LIST_REQUEST,
});

export const deleteShoppingListSuccess = (navigation) => {
  navigation.navigate('AllShoppingList');
  return {
    type: DELETE_SHOPPING_LIST_SUCCESS,
  };
};

export const deleteShoppingListFailure = (error) => {
  const { response } = error;
  Alert.alert(
    'La suppression a échoué',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: DELETE_SHOPPING_LIST_FAILURE });
};

export const getProfileRecipesRequest = () => ({
  type: GET_PROFILE_RECIPES_REQUEST,
});

export const getProfileRecipesSuccess = (response) => {
  let profileRecipes = [];
  if (response.data) profileRecipes = response.data;
  return {
    type: GET_PROFILE_RECIPES_SUCCESS,
    profileRecipes,
  };
};

export const getProfileRecipesFailure = () => ({
  type: GET_PROFILE_RECIPES_FAILURE,
  errorText: 'Une erreur est survenue pendant la récupération de la liste des recettes de l\'utilisateur',
});

export const showCreateRecipeAdviceForm = () => ({
  type: SHOW_CREATE_RECIPE_ADVICE_FORM,
});

export const hideCreateRecipeAdviceForm = () => ({
  type: HIDE_CREATE_RECIPE_ADVICE_FORM,
});

export const changeUserRecipeMark = userRecipeMark => ({
  type: CHANGE_USER_RECIPE_MARK,
  userRecipeMark,
});

export const changeUserRecipeComment = userRecipeComment => ({
  type: CHANGE_USER_RECIPE_COMMENT,
  userRecipeComment,
});

export const saveRecipeAdviceRequest = () => ({
  type: SAVE_RECIPE_ADVICE_REQUEST,
});

export const saveRecipeAdviceSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  Alert.alert('Merci', 'Votre avis va aider la communauté à se faire une idée de la qualité de la recette proposée. Merci !');
  return {
    type: SAVE_RECIPE_ADVICE_SUCCESS,
  };
};

export const saveRecipeAdviceFailure = (error) => {
  refreshAuthCredentials(error.response.headers);
  Alert.alert('Erreur', 'Une erreur s\'est produite pendant l\'enregistrement de votre avis');
  return {
    type: SAVE_RECIPE_ADVICE_FAILURE,
  };
};

export const changeBookModalVisible = visible => ({
  type: CHANGE_BOOK_MODAL_VISIBLE,
  visible,
});

export const changeListModalVisible = visible => ({
  type: CHANGE_LIST_MODAL_VISIBLE,
  visible,
});

export const changeListModalText = text => ({
  type: CHANGE_LIST_MODAL_TEXT,
  text,
});

export const changeListModalItem = item => ({
  type: CHANGE_LIST_MODAL_ITEM,
  item,
});

export const errorDisplay = (title, message) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: () => {
        },
      },
    ],
    { cancelable: false },
  );
  return ({ type: ERROR_DISPLAY });
};
