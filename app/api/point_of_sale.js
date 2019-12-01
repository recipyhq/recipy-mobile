import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
  GetPointOfSaleFailure, GetPointOfSaleRequest,
  GetPointOfSalesFailure,
  GetPointOfSalesRequest,
  GetPointOfSalesSuccess,
  GetPointOfSaleSuccess,
} from '../actions/point_of_sale';
import ApiUrl from '../config/api';

export const getPointOfSales = async (dispatch) => {
  dispatch(GetPointOfSalesRequest());
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
  return axios.get(
    `${ApiUrl}/api/point_of_sales?user_id=3`,
    {
      headers,
    },
  ).then((response) => {
    dispatch(GetPointOfSalesSuccess(response));
  }).catch((error) => {
    dispatch(GetPointOfSalesFailure(error));
  });
};

export const getPointOfSale = async (dispatch, id) => {
  dispatch(GetPointOfSaleRequest());
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
  return axios.get(
    `${ApiUrl}/api/point_of_sales/${id}`,
    {
      headers,
    },
  ).then((response) => {
    dispatch(GetPointOfSaleSuccess(response));
  }).catch((error) => {
    dispatch(GetPointOfSaleFailure(error));
  });
};

export default getPointOfSales;
