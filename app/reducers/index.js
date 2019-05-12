import { combineReducers } from 'redux';
import user from './user';
import ingredient from './ingredient';
import recipe from './recipe';
import recipebook from './recipebook';

export default combineReducers({
  user,
  ingredient,
  recipe,
  recipebook,
});
