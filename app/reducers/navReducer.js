import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { RootStack } from '../config/routes';

const navReducer = createNavigationReducer(RootStack);
export default navReducer;
