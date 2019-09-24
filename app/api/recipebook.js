/* eslint-disable no-unused-vars */
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
  getAllRecipeBookFailure,
  getAllRecipeBookRequest,
  getAllRecipeBookSuccess,
  getRecipeBookFailure,
  getRecipeBookRequest,
  getRecipeBookSuccess,
  searchRecipeBookFailure,
  searchRecipeBookRequest,
  searchRecipeBookSuccess,
  addRecipeToRecipeBookRequest,
  addRecipeToRecipeBookFailure,
  addRecipeToRecipeBookSuccess,
  removeRecipeToRecipeBookRequest,
  removeRecipeToRecipeBookFailure,
  removeRecipeToRecipeBookSuccess,
  createRecipeBookFailure,
  createRecipeBookRequest,
  createRecipeBookSuccess,
} from '../actions/recipebook';
import ApiUrl from '../config/api';

export const getAllRecipeBook = async (dispatch) => {
  dispatch(getAllRecipeBookRequest());
  const headers = { 'Content-Type': 'application/json' };
  const uid = await SecureStore.getItemAsync('userId');
  return axios(`${ApiUrl}/api/my_notebooks`,
    {
      headers,
      params: {
        user_id: uid,
      },
    }).then((response) => {
    dispatch(getAllRecipeBookSuccess(response, uid));
  }).catch((error) => {
    dispatch(getAllRecipeBookFailure(error));
  });
};

export const getRecipeBook = (dispatch, id, resolve, reject) => {
  dispatch(getRecipeBookRequest());
  const headers = { 'Content-Type': 'application/json' };
  return axios(`${ApiUrl}/api/notebooks/${id}`,
    {
      headers,
    }).then((response) => {
    dispatch(getRecipeBookSuccess(response));
    resolve();
  }).catch((error) => {
    dispatch(getRecipeBookFailure(error));
    reject('Error');
  });
};

export const searchForRecipeBook = async (dispatch, search) => {
  dispatch(searchRecipeBookRequest());
  const headers = { 'Content-Type': 'application/json' };
  const uid = await SecureStore.getItemAsync('userId');
  return axios.get(
    `${ApiUrl}/api/my_notebooks`,
    {
      headers,
      params: {
        user_id: uid,
        search: {
          q: search.q || undefined,
          notebooks: search.notebooks || undefined,
        },
      },
    },
  ).then((response) => {
    dispatch(searchRecipeBookSuccess(response, uid));
  }).catch((error) => {
    dispatch(searchRecipeBookFailure(error));
  });
};

export const addRecipeToRecipeBook = async (dispatch, title, user, recipeId, notebookId) => {
  dispatch(addRecipeToRecipeBookRequest());
  const uid = await SecureStore.getItemAsync('userId');
  return axios({
    method: 'post',
    url: `${ApiUrl}/api/notebooks/${notebookId}/add_recipe`,
    data: {
      notebook: {
        title,
        user_id: uid,
        recipe_id: recipeId,
      },
    },
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then((response) => {
    dispatch(addRecipeToRecipeBookSuccess(response));
  }).catch((error) => {
    dispatch(addRecipeToRecipeBookFailure(error));
  });
};

export const removeRecipeToRecipeBook = async (dispatch, title, user, recipeId, notebookId) => {
  dispatch(removeRecipeToRecipeBookRequest());
  const uid = await SecureStore.getItemAsync('userId');
  return axios({
    method: 'post',
    url: `${ApiUrl}/api/notebooks/${notebookId}/remove_recipe`,
    data: {
      notebook: {
        title,
        user_id: uid,
        recipe_id: recipeId,
      },
    },
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then(() => {
    dispatch(removeRecipeToRecipeBookSuccess());
  }).catch((error) => {
    dispatch(removeRecipeToRecipeBookFailure(error));
  });
};

export const createRecipeBook = async (dispatch, user, title, description, navigation) => {
  dispatch(createRecipeBookRequest());
  const uid = await SecureStore.getItemAsync('userId');
  return axios({
    method: 'post',
    url: `${ApiUrl}/api/notebooks`,
    data: {
      notebook: {
        title,
        description,
        user_id: uid,
      },
    },
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then(() => {
    dispatch(createRecipeBookSuccess());
    getAllRecipeBook(dispatch, user);
    navigation.navigate('RecipeBook');
  }).catch((error) => {
    dispatch(createRecipeBookFailure(error));
  });
};
