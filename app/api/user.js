import axios from 'axios';
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
} from '../actions/user';

export const signInUser = (dispatch, user) => {
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
    dispatch(signInUserSuccess(response));
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
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
      confirm_success_url: `${ApiUrl}`,
    },
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then((response) => {
    dispatch(signUpUserSuccess(response));
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
