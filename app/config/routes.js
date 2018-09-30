import { createStackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgottenPassword from '../screens/ForgottenPassword';

const Navigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: () => null,
    },
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'SE CONNECTER',
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "S'enregistrer",
    },
  },
  ForgottenPassword: {
    screen: ForgottenPassword,
    navigationOptions: {
      title: 'Récupération de mot de passe',
    },
  },
});

export default Navigator;
