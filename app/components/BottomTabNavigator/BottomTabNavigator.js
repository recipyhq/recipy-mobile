import { createBottomTabNavigator } from 'react-navigation';
import LogInScreen from '../../screens/LogInScreen/LogInScreen';

const BottomTabNavigator = createBottomTabNavigator({
  Login: LogInScreen,
});

export default BottomTabNavigator;
