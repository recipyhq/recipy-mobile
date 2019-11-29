/* eslint-disable no-unused-vars */
import axios from 'axios';
import qs from 'qs';
import * as SecureStore from 'expo-secure-store';
import { getPlanningSuccess, getPlanningRequest, getPlanningFailure } from '../actions/planning';
import ApiUrl from '../config/api';

export const getPlanning = async (dispatch, resolve, reject) => {
  dispatch(getPlanningRequest());
  const headers = { 'Content-Type': 'application/json' };
  const uid = await SecureStore.getItemAsync('userId');
  return axios(`${ApiUrl}/api/meal_plans`,
    {
      headers,
      params: {
        user_id: uid,
      },
    }).then((response) => {
    dispatch(getPlanningSuccess(response));
    resolve();
  }).catch((error) => {
    dispatch(getPlanningFailure(error));
    reject();
  });
};

export const getPlanningTest = async (dispatch, id) => {
  dispatch(getPlanningRequest());
  const headers = { 'Content-Type': 'application/json' };
  const uid = await SecureStore.getItemAsync('userId');
  return axios(`${ApiUrl}/api/planning/${id}`,
    {
      headers,
      params: {
        user_id: uid,
      },
    }).then((response) => {
    dispatch(getPlanningSuccess(response));
  }).catch((error) => {
    dispatch(getPlanningFailure(error));
  });
};