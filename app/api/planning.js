/* eslint-disable no-unused-vars */
import axios from 'axios';
import qs from 'qs';
import * as SecureStore from 'expo-secure-store';
import { getPlanningSuccess, getPlanningRequest, getPlanningFailure } from '../actions/planning';
import ApiUrl from '../config/api';

const getPlanning = async (dispatch, id) => {
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
