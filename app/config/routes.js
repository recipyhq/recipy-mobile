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
import Settings from '../screens/Settings';
import colors from './colors';
import RecipesList from '../screens/Cooker/Recipies/RecipesList';
import MyRecipes from '../screens/Cooker/Recipies/MyRecipes';
import RecipeDescription from '../screens/Authentication/RecipeDescription';

const SettingsStack = createStackNavigator({
  Settings,
  Profile,
}, {
  headerMode: 'none',
});

const RecipeStack = createStackNavigator({
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
      title: 'Welsh de gros',
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
    screen: RecipesList,
    navigationOptions: {
      tabBarLabel: 'Explorer',
      tabBarIcon: compassIcon,
    },
  },
  MyRecipe: {
    screen: RecipeStack,
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
