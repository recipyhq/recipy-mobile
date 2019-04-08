import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import SignIn from '../screens/Authentication/SignIn';
import SignUp from '../screens/Authentication/SignUp';
import ForgottenPassword from '../screens/Authentication/ForgottenPassword';
import Home from '../screens/Cooker/Home';
import HomeAuth from '../screens/Authentication/Home';
import Profile from '../screens/Profile';
import colors from './colors';
import RecipesList from '../screens/Cooker/Recipies/RecipesList';
import MyRecipes from '../screens/Cooker/Recipies/MyRecipes';
import ShoppingList from '../screens/Cooker/ShoppingList/ShoppingList';
import RecipeDescription from '../screens/Authentication/RecipeDescription';
import Settings from '../screens/Settings';
import RecipeBook from '../screens/Cooker/RecipeBook/RecipeBook';
import RecipeBookContent from '../screens/Cooker/RecipeBookContent/RecipeBookContent';
import AllShoppingList from '../screens/Cooker/ShoppingList/AllShoppingList';
import ShoppingListConsult from '../screens/Cooker/ShoppingList/ShoppingListConsult';

const SettingsStack = createStackNavigator(
  {
    Settings,
    Profile,
  },
  {
    headerMode: 'none',
  },
);

const RecipeListStack = createStackNavigator({
  MyRecipes: {
    screen: RecipesList,
    navigationOptions: {
      header: null,
    },
  },
  RecipeDescription: {
    screen: RecipeDescription,
    navigationOptions: {
      title: 'Description de la recette',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
  ShoppingList: {
    screen: ShoppingList,
    navigationOptions: {
      title: 'Créer une liste de course',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
  ShoppingListConsult: {
    screen: ShoppingListConsult,
    navigationOptions: {
      title: 'Liste de course',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
  RecipeBook: {
    screen: RecipeBook,
    navigationOptions: {
      title: 'Mes Carnets de recettes',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
  RecipeBookContent: {
    screen: RecipeBookContent,
    navigationOptions: {
      title: 'Recette du carnet',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
  AllShoppingList: {
    screen: AllShoppingList,
    navigationOptions: {
      title: 'Mes listes de courses',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
});

const MyRecipeStack = createStackNavigator({
  MyRecipes: {
    screen: MyRecipes,
    navigationOptions: {
      title: 'Mes recettes',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
  RecipeDescription: {
    screen: RecipeDescription,
    navigationOptions: {
      title: 'Description de la recette',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
  ShoppingList: {
    screen: ShoppingList,
    navigationOptions: {
      title: 'Créer une liste de course',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
  ShoppingListConsult: {
    screen: ShoppingListConsult,
    navigationOptions: {
      title: 'Liste de course',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
  RecipeBook: {
    screen: RecipeBook,
    navigationOptions: {
      title: 'Mes Carnets de recettes',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
  RecipeBookContent: {
    screen: RecipeBookContent,
    navigationOptions: {
      title: 'Recette du carnet',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
  AllShoppingList: {
    screen: AllShoppingList,
    navigationOptions: {
      title: 'Mes listes de courses',
      headerTintColor: colors.primaryGrey,
      headerStyle: {
        backgroundColor: colors.primaryOrange,
      },
    },
  },
});

function compassIcon({ tintColor }) {
  return (<FontAwesome5 name="compass" color={tintColor} size={24} />);
}

compassIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

function cogIcon({ tintColor }) {
  return (<FontAwesome5 name="cog" color={tintColor} size={24} />);
}

cogIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

function cutleryIcon({ tintColor }) {
  return (<FontAwesome5 name="cutlery" color={tintColor} size={24} />);
}

cutleryIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const TabCooker = createBottomTabNavigator({
  Home: {
    screen: RecipeListStack,
    navigationOptions: {
      tabBarLabel: 'Explorer',
      tabBarIcon: compassIcon,
    },
  },
  MyRecipe: {
    screen: MyRecipeStack,
    navigationOptions: {
      title: 'Mes recettes',
      tabBarIcon: cutleryIcon,
    },
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'Paramétres',
      tabBarIcon: cogIcon,
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.primaryOrange,
  },
});

const TabProducer = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Explorer',
      tabBarIcon: compassIcon,
    },
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'Paramétres',
      tabBarIcon: cogIcon,
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.primaryOrange,
  },
});

const NavigatorAuth = createStackNavigator({
  HomeAuth, SignIn, SignUp, ForgottenPassword, Profile,
},
{ headerMode: 'none' });

const Navigator = createSwitchNavigator({
  Cooker: TabCooker,
  Producer: TabProducer,
  NavigatorAuth,
},
{
  initialRouteName: 'NavigatorAuth',
});

export default Navigator;
