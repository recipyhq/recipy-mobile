import React from 'react';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './config/colors';
import store from './config/store';
import Navigator from './config/routes';

EStyleSheet.build({
  $primaryWhite: colors.primaryWhite,
  $primaryOrange: colors.primaryOrange,
  $primaryGrey: colors.primaryGrey,

  $mediumGrey: colors.mediumGrey,
  $lightGrey: colors.lightGrey,
});

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);
