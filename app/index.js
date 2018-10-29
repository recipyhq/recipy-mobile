import React from 'react';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import Navigator from './config/routes';
import colors from './config/colors';
import store from './config/store';


EStyleSheet.build({
  $primaryWhite: colors.primaryWhite,
  $primaryOrange: colors.primaryOrange,
  $primaryGrey: colors.primaryGrey,

  $mediumGrey: colors.mediumGrey,
  $lightGrey: colors.lightGrey,

  $inputText: '#797979',
});

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);
