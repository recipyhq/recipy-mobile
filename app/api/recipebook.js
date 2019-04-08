import axios from 'axios';
import {
  getAllRecipeBookFailure,
  getAllRecipeBookRequest, getAllRecipeBookSuccess, getRecipeBookFailure,
  getRecipeBookRequest, getRecipeBookSuccess,

} from '../actions/recipebook';
import ApiUrl from '../config/api';

export const getAllRecipeBook = (dispatch) => {
  dispatch(getAllRecipeBookRequest());
  const headers = { 'Content-Type': 'application/json' };
  // TODO Faire l'appelle à la bonne route
  return axios(`${ApiUrl}/api/recipes`,
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
  // TODO Faire l'appelle à la bonne route
  return axios(`${ApiUrl}/api/recipes/${id}`,
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
