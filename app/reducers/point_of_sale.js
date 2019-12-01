import {
  GET_POINTS_OF_SALE_FAILURE,
  GET_POINTS_OF_SALE_REQUEST,
  GET_POINTS_OF_SALE_SUCCESS,
  GET_POINT_OF_SALE_REQUEST,
  GET_POINT_OF_SALE_SUCCESS,
  GET_POINT_OF_SALE_FAILURE,
} from '../actions/point_of_sale';

const initialState = {
  isLoading: false,
  pointsOfSale: [],
  currentPointOfSale: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POINTS_OF_SALE_REQUEST:
      return {
        ...state,
        isLoading: false,
      };
    case GET_POINTS_OF_SALE_SUCCESS:
      return {
        ...state,
        pointsOfSale: action.pointsOfSale,
        isLoading: false,
      };
    case GET_POINTS_OF_SALE_FAILURE:
      return {
        ...state,
        pointsOfSale: null,
        isLoading: false,
      };
    case GET_POINT_OF_SALE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POINT_OF_SALE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentPointOfSale: action.currentPointOfSale,
      };
    case GET_POINT_OF_SALE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
