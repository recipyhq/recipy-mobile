import axios from 'axios';
import qs from 'qs';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import {
  searchRecipeFailure,
  searchRecipeRequest,
  searchRecipeSuccess,
  GetUserRecipeListFailure,
  GetUserRecipeListRequest,
  GetUserRecipeListSuccess,
  getRecipeRequest,
  getRecipeSuccess,
  getRecipeFailure,
  getAllShoppingListRequest,
  getAllShoppingListSuccess,
  getAllShoppingListFailure,
  getShoppingListRequest,
  getShoppingListSuccess,
  getShoppingListFailure,
  createShoppingListRequest,
  createShoppingListSuccess,
  createShoppingListFailure,
  deleteShoppingListRequest,
  deleteShoppingListSuccess,
  deleteShoppingListFailure,
  searchIngredientRequest,
  searchIngredientSuccess,
  searchIngredientFailure,
  getProfileRecipesRequest,
  getProfileRecipesSuccess,
  getProfileRecipesFailure,
  updateShoppingListRequest,
  updateShoppingListSuccess,
  updateShoppingListFailure,
  updateCheckboxRequest,
  updateCheckboxSuccess,
  updateCheckboxFailure,
  saveRecipeAdviceRequest,
  saveRecipeAdviceSuccess,
  saveRecipeAdviceFailure,
  searchQuantityTypeRequest,
  searchQuantityTypeSuccess,
  searchQuantityTypeFailure,
} from '../actions/recipe';
import ApiUrl from '../config/api';

export const searchForRecipe = async (dispatch, search) => {
  dispatch(searchRecipeRequest());
  const accessToken = await SecureStore.getItemAsync('access-token');
  const client = await SecureStore.getItemAsync('client');
  const uid = await SecureStore.getItemAsync('uid');
  const headers = {
    'Content-Type': 'application/json',
    uid,
    'token-type': 'Bearer',
    'access-token': accessToken,
    client,
  };
  return axios.get(
    `${ApiUrl}/api/search/`,
    {
      headers,
      params: {
        search: {
          q: search.q || undefined,
        },
      },
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    },
  ).then((response) => {
    dispatch(searchRecipeSuccess(response));
  }).catch((error) => {
    dispatch(searchRecipeFailure(error));
  });
};

export const searchForIngredient = (dispatch, search, resolve, reject) => {
  dispatch(searchIngredientRequest());
  const headers = { 'Content-Type': 'application/json' };
  return axios.get(
    `${ApiUrl}/api/search/`,
    {
      headers,
      params: {
        search: {
          q: search.q || undefined,
          ingredients: search.ingredients || undefined,
        },
      },
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    },
  ).then((response) => {
    dispatch(searchIngredientSuccess(response));
    resolve();
  }).catch((error) => {
    dispatch(searchIngredientFailure(error));
    reject();
  });
};

export const searchForQuantityType = (dispatch, search, resolve, reject) => {
  dispatch(searchQuantityTypeRequest());
  const headers = { 'Content-Type': 'application/json' };
  return axios(
    `${ApiUrl}/api/quantity_type`,
    {
      headers,
    },
  ).then((response) => {
    dispatch(searchQuantityTypeSuccess(response));
    resolve();
  }).catch((error) => {
    dispatch(searchQuantityTypeFailure(error));
    reject();
  });
};

export const getUserRecipeList = async (dispatch, uid) => {
  dispatch(GetUserRecipeListRequest());
  const headers = { 'Content-Type': 'application/json' };
  return axios(`${ApiUrl}/api/my_recipes?user_id=${uid}`,
    {
      headers,
    }).then((response) => {
    dispatch(GetUserRecipeListSuccess(response));
  }).catch((error) => {
    dispatch(GetUserRecipeListFailure(error));
  });
};

export const getProfileRecipes = (dispatch) => {
  dispatch(getProfileRecipesRequest());
  const headers = { 'Content-Type': 'application/json' };
  return axios(`${ApiUrl}/api/recipes`,
    {
      headers,
    }).then((response) => {
    dispatch(getProfileRecipesSuccess(response));
  }).catch((error) => {
    dispatch(getProfileRecipesFailure(error));
  });
};

export const getRecipe = (dispatch, id, resolve, reject) => {
  dispatch(getRecipeRequest());
  const headers = { 'Content-Type': 'application/json' };
  return axios(`${ApiUrl}/api/recipes/${id}`,
    {
      headers,
    }).then((response) => {
    dispatch(getRecipeSuccess(response));
    if (resolve !== undefined) resolve();
  }).catch((error) => {
    dispatch(getRecipeFailure(error));
    if (reject !== undefined) reject('Error');
  });
};

export const getAllShoppingList = async (dispatch) => {
  dispatch(getAllShoppingListRequest());
  const headers = { 'Content-Type': 'application/json' };
  const uid = await SecureStore.getItemAsync('userId');
  return axios(`${ApiUrl}/api/shopping_lists`,
    {
      headers,
      params: {
        user_id: uid,
      },
    }).then((response) => {
    dispatch(getAllShoppingListSuccess(response));
  }).catch((error) => {
    dispatch(getAllShoppingListFailure(error));
  });
};

export const getShoppingList = async (dispatch, id, resolve, reject) => {
  dispatch(getShoppingListRequest());
  const headers = { 'Content-Type': 'application/json' };
  const uid = await SecureStore.getItemAsync('userId');
  return axios(`${ApiUrl}/api/shopping_lists/${id}`,
    {
      headers,
      params: {
        user_id: uid,
      },
    }).then((response) => {
    dispatch(getShoppingListSuccess(response));
    resolve();
  }).catch((error) => {
    dispatch(getShoppingListFailure(error));
    reject('Error');
  });
};

export const createShoppingList = async (dispatch, listTitle,
  ingredientList, ingredientListId, navigation, tab) => {
  dispatch(createShoppingListRequest());
  const uid = await SecureStore.getItemAsync('userId');
  return axios({
    method: 'post',
    url: `${ApiUrl}/api/shopping_lists`,
    data: {
      shopping_list: {
        user_id: uid,
        name: listTitle,
        list_ingredients: tab,
      },
    },
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then(() => {
    dispatch(createShoppingListSuccess());
    getAllShoppingList(dispatch);
    navigation.navigate('AllShoppingList');
  }).catch((error) => {
    dispatch(createShoppingListFailure(error));
  });
};

export const updateShoppingList = async (dispatch, ingredientList, listId, navigation) => {
  dispatch(updateShoppingListRequest());
  const uid = await SecureStore.getItemAsync('userId');
  return axios({
    method: 'put',
    url: `${ApiUrl}/api/shopping_lists/${listId}`,
    data: {
      shopping_list: {
        user_id: uid,
        ingredient_ids: ingredientList,
      },
    },
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then(() => {
    dispatch(updateShoppingListSuccess());
    getAllShoppingList(dispatch);
    navigation.navigate('AllShoppingList');
  }).catch((error) => {
    dispatch(updateShoppingListFailure(error));
  });
};

export const updateCheckbox = async (dispatch, list, index) => {
  dispatch(updateCheckboxRequest());
  return axios({
    method: 'post',
    url: `${ApiUrl}/api/shopping_lists/${list.id}/update_item_checkbox`,
    data: {
      id: list.id,
      ingredient_id: list.ingredients[index].ingredient.id,
    },
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then(() => {
    dispatch(updateCheckboxSuccess());
  }).catch((error) => {
    dispatch(updateCheckboxFailure(error));
  });
};

export const deleteShoppingList = (dispatch, id, navigation) => {
  dispatch(deleteShoppingListRequest());
  return axios({
    method: 'delete',
    url: `${ApiUrl}/api/shopping_lists/${id}`,
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then(() => {
    dispatch(deleteShoppingListSuccess(navigation));
    getAllShoppingList(dispatch);
  }).catch((error) => {
    dispatch(deleteShoppingListFailure(error));
  });
};

export const saveRecipeAdvice = async (dispatch, currentRecipe, userAdvice) => {
  if (userAdvice.mark && (userAdvice.mark > 5 || userAdvice.mark < 0)) {
    Alert.alert('Note invalide', 'Merci pour avis. Malheuresement celui-ci n\'est pas valide, veuillez fournir une note entre 0 et 5');
    return;
  }
  dispatch(saveRecipeAdviceRequest());
  const accessToken = await SecureStore.getItemAsync('access-token');
  const client = await SecureStore.getItemAsync('client');
  const uid = await SecureStore.getItemAsync('uid');
  const headers = {
    'Content-Type': 'application/json',
    uid,
    'token-type': 'Bearer',
    'access-token': accessToken,
    client,
  };
  const data = {
    recipe_score: {
      value: userAdvice.mark,
      content: userAdvice.comment,
    },
  };
  axios.post(`${ApiUrl}/api/recipes/${currentRecipe.id}/feedback`,
    data,
    {
      headers,
    }).then((response) => {
    dispatch(saveRecipeAdviceSuccess(response));
    getRecipe(dispatch, currentRecipe.id);
  }).catch((error) => {
    dispatch(saveRecipeAdviceFailure(error));
  });
};
