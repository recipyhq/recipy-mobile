import axios from 'axios';
import qs from 'qs';
import {
  getAllRecipeBookFailure,
  getAllRecipeBookRequest, getAllRecipeBookSuccess, getRecipeBookFailure,
  getRecipeBookRequest, getRecipeBookSuccess, searchRecipeBookFailure,
  searchRecipeBookRequest, searchRecipeBookSuccess,
} from '../actions/recipebook';
import ApiUrl from '../config/api';

export const getAllRecipeBook = (dispatch) => {
  dispatch(getAllRecipeBookRequest());
  const headers = { 'Content-Type': 'application/json' };
  return axios(`${ApiUrl}/api/notebooks`,
    {
      headers,
    }).then((response) => {
    dispatch(getAllRecipeBookSuccess(response));
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

export const searchForRecipeBook = (dispatch, search) => {
  dispatch(searchRecipeBookRequest());
  const headers = { 'Content-Type': 'application/json' };
  return axios.get(
    `${ApiUrl}/api/notebooks/`,
    {
      headers,
      params: {
        search: {
          q: search.q || undefined,
          notebooks: search.notebooks || undefined,
        },
      },
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    },
  ).then((response) => {
    dispatch(searchRecipeBookSuccess(response));
  }).catch((error) => {
    dispatch(searchRecipeBookFailure(error));
  });
};
