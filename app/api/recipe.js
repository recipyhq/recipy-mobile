import axios from 'axios';
import qs from 'qs';
import {
  searchRecipeFailure,
  searchRecipeRequest,
  searchRecipeSuccess,
  getAllRecipeFailure,
  getAllRecipeRequest,
  getAllRecipeSuccess,
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

export const getAllRecipe = (dispatch) => {
  dispatch(getAllRecipeRequest());
  const headers = { 'Content-Type': 'application/json' };
  return axios(`${ApiUrl}/api/recipes`,
    {
      headers,
    }).then((response) => {
    dispatch(getAllRecipeSuccess(response));
  }).catch((error) => {
    dispatch(getAllRecipeFailure(error));
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

export const getAllShoppingList = (dispatch) => {
  dispatch(getAllShoppingListRequest());
  const headers = { 'Content-Type': 'application/json' };
  return axios(`${ApiUrl}/api/shopping_lists`,
    {
      headers,
    }).then((response) => {
    dispatch(getAllShoppingListSuccess(response));
  }).catch((error) => {
    dispatch(getAllShoppingListFailure(error));
  });
};

export const getShoppingList = (dispatch, id, resolve, reject) => {
  dispatch(getShoppingListRequest());
  const headers = { 'Content-Type': 'application/json' };
  return axios(`${ApiUrl}/api/shopping_lists/${id}`,
    {
      headers,
    }).then((response) => {
    dispatch(getShoppingListSuccess(response));
    resolve();
  }).catch((error) => {
    dispatch(getShoppingListFailure(error));
    reject('Error');
  });
};

export const createShoppingList = (dispatch, listTitle, ingredientList, navigation) => {
  dispatch(createShoppingListRequest());
  return axios({
    method: 'post',
    url: `${ApiUrl}/api/shopping_lists`,
    data: {
      shopping_list: {
        name: listTitle,
        ingredient_ids: ingredientList,
      },
    },
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then(() => {
    dispatch(createShoppingListSuccess());
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
  }).catch((error) => {
    dispatch(deleteShoppingListFailure(error));
  });
};
