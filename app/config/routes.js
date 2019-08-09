import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import ForgottenPassword from '../screens/Account/Authentication/ForgottenPassword';
import ProfileEdit from '../screens/Account/ProfileEdit';
import colors from './colors';
import RecipesList from '../screens/Cooker/Recipies/RecipesList';
import MyRecipes from '../screens/Cooker/Recipies/MyRecipes';
import ShoppingList from '../screens/Cooker/ShoppingList/ShoppingList';
import RecipeDescription from '../screens/Account/Authentication/RecipeDescription';
import Settings from '../screens/Account/Account';
import RecipeBook from '../screens/Cooker/RecipeBook/RecipeBook';
import CreateRecipeBook from '../screens/Cooker/RecipeBook/CreateRecipeBook';
import RecipeBookContent from '../screens/Cooker/RecipeBookContent/RecipeBookContent';
import AllShoppingList from '../screens/Cooker/ShoppingList/AllShoppingList';
import ShoppingListConsult from '../screens/Cooker/ShoppingList/ShoppingListConsult';
import Profile from '../screens/Cooker/Profile';
import ProducerProfile from '../screens/Producer/Profile';
import PointOfSaleView from '../screens/Producer/PointOfSale/view';
import SignUp from '../screens/Account/Authentication/SignUp';
import SignIn from '../screens/Account/Authentication/SignIn';

const ProfileStack = createStackNavigator(
  {
    Profile,
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
  },
  {
    headerMode: 'none',
  },
);

const ProducerProfileStack = createStackNavigator(
  {
    ProducerProfile,
    PointOfSaleView,
  },
  {
    headerMode: 'none',
  },
);

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
  CreateRecipeBook: {
    screen: CreateRecipeBook,
    navigationOptions: {
      title: 'Créer un carnet',
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

const AccountStack = createStackNavigator(
  {
    Settings,
    ProfileEdit,
    ProfileStack,
    ProducerProfileStack,
    MyRecipeStack,
    ForgottenPassword,
    SignUp,
    SignIn,
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
  CreateRecipeBook: {
    screen: CreateRecipeBook,
    navigationOptions: {
      title: 'Créer un carnet',
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

function userIcon({ tintColor }) {
  return (<FontAwesome5 name="user" color={tintColor} size={24} />);
}

userIcon.propTypes = {
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
  Settings: {
    screen: AccountStack,
    navigationOptions: {
      tabBarLabel: 'Mon compte',
      tabBarIcon: userIcon,
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.primaryOrange,
  },
});

const Navigator = createSwitchNavigator({
  Cooker: TabCooker,
},
{
  initialRouteName: 'Cooker',
});

export default Navigator;
