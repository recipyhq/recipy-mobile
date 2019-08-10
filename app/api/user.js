import axios from 'axios';
import * as SecureStore from 'expo/build/SecureStore/SecureStore';
import ApiUrl from '../config/api';
import {
  resetPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  signInUserFailure,
  signInUserRequest,
  signInUserSuccess,
  signUpUserFailure,
  signUpUserRequest,
  signUpUserSuccess,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
  GetCurrentUserRequest,
  GetCurrentUserSuccess,
  GetCurrentUserFailure,
} from '../actions/user';

export const signInUser = (dispatch, navigation, user) => {
  dispatch(signInUserRequest());
  return axios({
    method: 'post',
    url: `${ApiUrl}/api/users/sign_in`,
    data: {
      email: user.email,
      password: user.password,
    },
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then((response) => {
    dispatch(signInUserSuccess(response, navigation, dispatch));
  }).catch((error) => {
    dispatch(signInUserFailure(error));
  });
};

export const signUpUser = (dispatch, user) => {
  dispatch(signUpUserRequest());
  return axios({
    method: 'post',
    url: `${ApiUrl}/api/users`,
    data: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
      confirm_success_url: `${ApiUrl}`,
    },
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then(() => {
    dispatch(signUpUserSuccess());
  }).catch((error) => {
    dispatch(signUpUserFailure(error));
  });
};

export const resetPassword = (dispatch, user) => {
  dispatch(resetPasswordRequest());
  return axios({
    method: 'post',
    url: `${ApiUrl}/api/users/password`,
    data: {
      email: user.email,
      redirect_url: ApiUrl,
    },
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then((response) => {
    dispatch(resetPasswordSuccess(response));
  }).catch((error) => {
    dispatch(resetPasswordFailure(error));
  });
};

export const editUser = async (dispatch, user, errorManager) => {
  dispatch(editUserRequest());
  const accessToken = await SecureStore.getItemAsync('access-token');
  const client = await SecureStore.getItemAsync('client');
  const uid = await SecureStore.getItemAsync('uid');
  const headers = {
    'Content-Type': 'application/json',
    uid,
    'token-type': 'Bearer',
    'access-token': accessToken,
    client,
  };
  const data = {
    current_password: user.current_password,
  };
  if (user.email && user.email !== '') {
    data.email = user.email;
  }
  if (user.password && user.password !== '') {
    data.password = user.password;
  }
  if (user.password_confirmation && user.password_confirmation !== '') {
    data.password_confirmation = user.password_confirmation;
  }
  return axios.put(`${ApiUrl}/api/users`,
    data,
    {
      headers,
    }).then((response) => {
    dispatch(editUserSuccess(response, errorManager));
  }).catch((error) => {
    dispatch(editUserFailure(error, errorManager));
  });
};

export const getCurrentUser = async (dispatch) => {
  dispatch(GetCurrentUserRequest());
  const userId = await SecureStore.getItemAsync('userId');
  return axios.get(`${ApiUrl}/api/user/info?user_id=${userId}`)
    .then((response) => {
      dispatch(GetCurrentUserSuccess(response));
    }).catch((error) => {
      dispatch(GetCurrentUserFailure(error));
    });
};
