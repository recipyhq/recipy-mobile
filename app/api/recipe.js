import axios from 'axios';
import qs from 'qs';
import {
  searchRecipeFailure,
  searchRecipeRequest,
  searchRecipeSuccess,
  getAllRecipeFailure,
  getAllRecipeRequest,
  getAllRecipeSuccess,
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
