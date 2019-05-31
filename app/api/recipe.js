/* eslint-disable no-unused-vars */
import axios from 'axios';
import * as SecureStore from 'expo/src/SecureStore';
import qs from 'qs';
import {
  searchRecipeFailure,
  searchRecipeRequest,
  searchRecipeSuccess,
  getMyRecipeListFailure,
  getMyRecipeListRequest,
  getMyRecipeListSuccess,
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
  deleteShoppingListFailure, searchIngredientRequest,
  searchIngredientSuccess, searchIngredientFailure,
  getProfileRecipesRequest, getProfileRecipesSuccess, getProfileRecipesFailure,
} from '../actions/recipe';
import ApiUrl from '../config/api';

export const searchForRecipe = (dispatch, search) => {
  dispatch(searchRecipeRequest());
  const headers = { 'Content-Type': 'application/json' };
  return axios.get(
    `${ApiUrl}/api/search/`,
    {
      headers,
      params: {
        search: {
          q: search.q || undefined,
          ingredients: search.ingredients || undefined,
          time: search.time || undefined,
          difficulty: search.difficulty || undefined,
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

export const searchForIngredient = (dispatch, search) => {
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
  }).catch((error) => {
    dispatch(searchIngredientFailure(error));
  });
};

export const getAllRecipe = async (dispatch, user) => {
  dispatch(getMyRecipeListRequest());
  const headers = { 'Content-Type': 'application/json' };
  const uid = await SecureStore.getItemAsync('userId');
  return axios(`${ApiUrl}/api/my_recipes`,
    {
      headers,
      params: {
        user_id: uid,
      },
    }).then((response) => {
    dispatch(getMyRecipeListSuccess(response));
  }).catch((error) => {
    dispatch(getMyRecipeListFailure(error));
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
    resolve();
  }).catch((error) => {
    dispatch(getRecipeFailure(error));
    reject('Error');
  });
};

export const getAllShoppingList = async (dispatch, user) => {
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

export const getShoppingList = async (dispatch, id, resolve, reject, user) => {
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

export const createShoppingList = async (dispatch, listTitle, ingredientList, navigation, user) => {
  dispatch(createShoppingListRequest());
  const uid = await SecureStore.getItemAsync('userId');
  return axios({
    method: 'post',
    url: `${ApiUrl}/api/shopping_lists`,
    data: {
      shopping_list: {
        user_id: uid,
        name: listTitle,
        ingredient_ids: ingredientList,
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
