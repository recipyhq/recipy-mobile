import { refreshAuthCredentials } from './user';

// GET_POINTS_OF_SALE
export const GET_POINTS_OF_SALE_REQUEST = 'GET_POINTS_OF_SALE_REQUEST';
export const GET_POINTS_OF_SALE_SUCCESS = 'GET_POINTS_OF_SALE_SUCCESS';
export const GET_POINTS_OF_SALE_FAILURE = 'GET_POINTS_OF_SALE_FAILURE';

// GET_POINT_OF_SALE
export const GET_POINT_OF_SALE_REQUEST = 'GET_POINT_OF_SALE_REQUEST';
export const GET_POINT_OF_SALE_SUCCESS = 'GET_POINT_OF_SALE_SUCCESS';
export const GET_POINT_OF_SALE_FAILURE = 'GET_POINT_OF_SALE_FAILURE';

export const GetPointOfSalesRequest = () => ({
  type: GET_POINTS_OF_SALE_REQUEST,
});

export const GetPointOfSalesSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let pointsOfSale = [];
  if (response.data) pointsOfSale = response.data;
  return ({
    type: GET_POINTS_OF_SALE_SUCCESS,
    pointsOfSale,
  });
};

export const GetPointOfSalesFailure = () => ({ type: GET_POINTS_OF_SALE_FAILURE });

export const GetPointOfSaleRequest = () => ({
  type: GET_POINT_OF_SALE_REQUEST,
});

export const GetPointOfSaleSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  let currentPointOfSale = [];
  if (response.data) currentPointOfSale = response.data;
  return ({
    type: GET_POINT_OF_SALE_SUCCESS,
    currentPointOfSale,
  });
};

export const GetPointOfSaleFailure = () => ({
  type: GET_POINT_OF_SALE_FAILURE,
});
