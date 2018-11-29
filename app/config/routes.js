import { createStackNavigator } from 'react-navigation';

import Home from '../screens/Authentication/Home';
import SignIn from '../screens/Authentication/SignIn';
import SignUp from '../screens/Authentication/SignUp';
import ForgottenPassword from '../screens/Authentication/ForgottenPassword';
import MyRecipe from '../screens/Authentication/MyRecipe';
import RecipeDescription from '../screens/Authentication/RecipeDescription';

const Navigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
    },
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Se connecter',
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
  MyRecipe: {
    screen: MyRecipe,
    navigationOptions: {
      title: 'Mes recettes',
    },
  },
  RecipeDescription: {
    screen: RecipeDescription,
    navigationOptions: {
      title: 'Description de la recette',
    },
  },
}, {
  headerMode: 'none',
});

export default Navigator;
