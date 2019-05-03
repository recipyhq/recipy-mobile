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
import HomeAuth from '../screens/Authentication/Home';
import ProfileEdit from '../screens/ProfileEdit';
import colors from './colors';
import RecipesList from '../screens/Cooker/Recipies/RecipesList';
import MyRecipes from '../screens/Cooker/Recipies/MyRecipes';
import RecipeDescription from '../screens/Authentication/RecipeDescription';
import Settings from '../screens/Account';
import Profile from '../screens/Cooker/Profile';
import ProducerProfile from '../screens/Producer/Profile';

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
  },
  {
    headerMode: 'none',
  },
);

const AccountStack = createStackNavigator(
  {
    Settings,
    ProfileEdit,
    ProfileStack,
    ProducerProfileStack,
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
  MyRecipe: {
    screen: MyRecipeStack,
    navigationOptions: {
      title: 'Mes recettes',
      tabBarIcon: cutleryIcon,
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

const NavigatorAuth = createStackNavigator({
  HomeAuth, SignIn, SignUp, ForgottenPassword, Profile,
},
{ headerMode: 'none' });

const Navigator = createSwitchNavigator({
  Cooker: TabCooker,
  NavigatorAuth,
},
{
  initialRouteName: 'NavigatorAuth',
});

export default Navigator;
