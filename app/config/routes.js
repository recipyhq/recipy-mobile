import { createStackNavigator } from 'react-navigation';
import LogInScreen from '../screens/LogInScreen/LogInScreen';

export const RootStack = createStackNavigator({
  Home: {
    screen: LogInScreen,
  },
});

export default RootStack;
