import EStyleSheet from 'react-native-extended-stylesheet';
import Expo from 'expo';

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: Expo.Constants.statusBarHeight,
  },
});
