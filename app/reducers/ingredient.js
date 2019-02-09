import {
  FETCH_INGREDIENTS_LIST_REQUEST,
  FETCH_INGREDIENTS_LIST_SUCCESS,
  FETCH_INGREDIENTS_LIST_FAILURE,
} from '../actions/ingredient';

const initialState = {
  list: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_INGREDIENTS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_INGREDIENTS_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
