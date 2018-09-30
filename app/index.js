import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Navigator from './config/routes';
import colors from './config/colors';

EStyleSheet.build({
  $primaryWhite: colors.primaryWhite,
  $primaryOrange: colors.primaryOrange,
  $primaryGrey: colors.primaryGrey,

  $mediumGrey: colors.mediumGrey,
  $lightGrey: colors.lightGrey,

  $inputText: '#797979',
});

export default () => <Navigator />;
