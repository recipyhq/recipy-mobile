/* eslint-disable no-unused-vars */
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
  getPlanningSuccess,
  getPlanningRequest,
  getPlanningFailure,
  reloadPlanningRequest,
  reloadPlanningSuccess,
  reloadPlanningFailure,
  generatePlanningFailure,
  generatePlanningSuccess,
  generatePlanningRequest,
  createPlanningListRequest,
  createPlanningListSuccess,
  createPlanningListFailure,
} from '../actions/planning';
import ApiUrl from '../config/api';
import { getAllShoppingList } from './recipe';

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

export const createPlanningList = async (dispatch, navigation) => {
  dispatch(createPlanningListRequest());
  const headers = { 'Content-Type': 'application/json' };
  const uid = await SecureStore.getItemAsync('userId');
  return axios(`${ApiUrl}/api/meal_plans/create_list`,
    {
      method: 'post',
      headers,
      params: {
        user_id: uid,
      },
    }).then((response) => {
    dispatch(createPlanningListSuccess(response));
    getAllShoppingList(dispatch);
    navigation.navigate('AllShoppingList');
  }).catch((error) => {
    dispatch(createPlanningListFailure(error));
  });
};

export const generatePlanning = async (dispatch, resolve, reject) => {
  dispatch(generatePlanningRequest());
  const headers = { 'Content-Type': 'application/json' };
  const uid = await SecureStore.getItemAsync('userId');
  return axios(`${ApiUrl}/api/meal_plans`,
    {
      method: 'put',
      headers,
      params: {
        user_id: uid,
      },
    }).then((response) => {
    dispatch(generatePlanningSuccess(response));
    resolve();
  }).catch((error) => {
    dispatch(generatePlanningFailure(error));
    reject();
  });
};

export const reloadPlanning = async (dispatch, id, resolve, reject) => {
  dispatch(reloadPlanningRequest());
  const headers = { 'Content-Type': 'application/json' };
  const uid = await SecureStore.getItemAsync('userId');
  return axios(`${ApiUrl}/api/meal_plans/${id}/reload`,
    {
      method: 'post',
      headers,
      params: {
        user_id: uid,
      },
    }).then((response) => {
    dispatch(reloadPlanningSuccess(response));
    resolve();
  }).catch((error) => {
    dispatch(reloadPlanningFailure(error));
    reject();
  });
};
