import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_CONFIRMATION,
  CHANGE_CURRENT_PASSWORD,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  SIGN_OUT_USER,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_FAILURE,
  GET_CURRENT_USER_SUCCESS, CHANGE_FIRST_NAME, CHANGE_LAST_NAME,
} from '../actions/user';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  password_confirmation: '',
  id: 0,
  isLoading: false,
  currentUser: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FIRST_NAME:
      return {
        ...state,
        firstName: action.firstName || '',
      };
    case CHANGE_LAST_NAME:
      return {
        ...state,
        lastName: action.lastName || '',
      };
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
    case CHANGE_CURRENT_PASSWORD:
      return {
        ...state,
        current_password: action.current_password || '',
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
        currentUser: action.currentUser,
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
    case EDIT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case EDIT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_CURRENT_USER_REQUEST:
      return {
        isLoading: true,
        ...state,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        isLoading: false,
        ...state,
        currentUser: action.currentUser,
      };
    case GET_CURRENT_USER_FAILURE:
      return {
        isLoading: false,
        ...state,
      };
    case SIGN_OUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
