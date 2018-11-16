import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_CONFIRMATION,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from '../actions/user';

const initialState = {
  email: '',
  password: '',
  password_confirmation: '',
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.email || '',
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.password || '',
      };
    case CHANGE_PASSWORD_CONFIRMATION:
      return {
        ...state,
        password_confirmation: action.password_confirmation || '',
      };
    case SIGN_IN_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_IN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SIGN_IN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case SIGN_UP_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SIGN_UP_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
