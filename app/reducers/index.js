import { combineReducers } from 'redux';
import user from './user';
import ingredient from './ingredient';
import recipe from './recipe';

export default combineReducers({
  user,
  ingredient,
  recipe,
});
