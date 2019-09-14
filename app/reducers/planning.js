import {
  GET_PLANNING_REQUEST,
  GET_PLANNING_SUCCESS,
  GET_PLANNING_FAILURE,
} from '../actions/planning';

const initialState = {
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLANNING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PLANNING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case GET_PLANNING_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
