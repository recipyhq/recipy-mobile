import {
  CHANGE_EMAIL, CHANGE_PASSWORD,
} from '../actions/user';

const initialState = {
  user: {
    email: '',
    password: '',
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
    default:
      return state;
  }
};

export default reducer;
