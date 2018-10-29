import {
  CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_PASSWORD_CONFIRMATION,
} from '../actions/user';

const initialState = {
  user: {
    email: '',
    password: '',
    password_confirmation: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email || '',
        },
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        user: {
          ...state.user,
          password: action.password || '',
        },
      };
    case CHANGE_PASSWORD_CONFIRMATION:
      return {
        ...state,
        user: {
          ...state.user,
          password_confirmation: action.password_confirmation || '',
        },
      };
    default:
      return state;
  }
};

export default reducer;
