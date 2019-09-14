/* eslint-disable no-unused-vars */
import { Alert } from 'react-native';
import { refreshAuthCredentials } from './user';

// GET_RECIPE
export const GET_PLANNING_REQUEST = 'GET_PLANNING_REQUEST';
export const GET_PLANNING_SUCCESS = 'GET_PLANNING_SUCCESS';
export const GET_PLANNING_FAILURE = 'GET_PLANNING_FAILURE';

export const getPlanningRequest = () => ({
  type: GET_PLANNING_REQUEST,
});

export const getPlanningSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let currentPlanning = [];
  if (response.data) currentPlanning = response.data;
  return ({
    type: GET_PLANNING_SUCCESS,
    currentPlanning,
  });
};

export const getPlanningFailure = (error) => {
  const { response } = error;
  Alert.alert(
    'Une erreur est survenue lors de la récupération du planning',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: GET_PLANNING_FAILURE });
};
