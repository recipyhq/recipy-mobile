/* eslint-disable no-unused-vars */
import { Alert } from 'react-native';
import { refreshAuthCredentials } from './user';

// GET_PLANNING
export const GET_PLANNING_REQUEST = 'GET_PLANNING_REQUEST';
export const GET_PLANNING_SUCCESS = 'GET_PLANNING_SUCCESS';
export const GET_PLANNING_FAILURE = 'GET_PLANNING_FAILURE';

export const GENERATE_PLANNING_REQUEST = 'GENERATE_PLANNING_REQUEST';
export const GENERATE_PLANNING_SUCCESS = 'GENERATE_PLANNING_SUCCESS';
export const GENERATE_PLANNING_FAILURE = 'GENERATE_PLANNING_FAILURE';

export const RELOAD_PLANNING_REQUEST = 'RELOAD_PLANNING_REQUEST';
export const RELOAD_PLANNING_SUCCESS = 'RELOAD_PLANNING_SUCCESS';
export const RELOAD_PLANNING_FAILURE = 'RELOAD_PLANNING_FAILURE';

export const CREATE_PLANNING_LIST_REQUEST = 'CREATE_PLANNING_LIST_REQUEST';
export const CREATE_PLANNING_LIST_SUCCESS = 'CREATE_PLANNING_LIST_SUCCESS';
export const CREATE_PLANNING_LIST_FAILURE = 'CREATE_PLANNING_LIST_FAILURE';

export const ADD_RECIPE_IN_DAY_PLAN = 'ADD_RECIPE_IN_DAY_PLAN';
export const ADD_RECIPE_IN_HEBDO_PLAN = 'ADD_RECIPE_IN_HEBDO_PLAN';
export const EMPTY_DAY_PLAN = 'EMPTY_DAY_PLAN';

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

export const generatePlanningRequest = () => ({
  type: GENERATE_PLANNING_REQUEST,
});

export const generatePlanningSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let currentPlanning = [];
  if (response.data) currentPlanning = response.data;
  return ({
    type: GENERATE_PLANNING_SUCCESS,
    currentPlanning,
  });
};

export const generatePlanningFailure = (error) => {
  const { response } = error;
  Alert.alert(
    'Une erreur est survenue lors de la génération du planning',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: GENERATE_PLANNING_FAILURE });
};


export const reloadPlanningRequest = () => ({
  type: RELOAD_PLANNING_REQUEST,
});

export const reloadPlanningSuccess = () => ({
  type: RELOAD_PLANNING_SUCCESS,
});

export const reloadPlanningFailure = (error) => {
  const { response } = error;
  Alert.alert(
    'Une erreur est survenue lors de la réinitialisation du planning',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: RELOAD_PLANNING_FAILURE });
};


export const createPlanningListRequest = () => ({
  type: CREATE_PLANNING_LIST_REQUEST,
});

export const createPlanningListSuccess = () => ({
  type: CREATE_PLANNING_LIST_SUCCESS,
});

export const createPlanningListFailure = (error) => {
  const { response } = error;
  Alert.alert(
    'Une erreur est survenue lors de la creation de la liste de course',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: CREATE_PLANNING_LIST_FAILURE });
};
