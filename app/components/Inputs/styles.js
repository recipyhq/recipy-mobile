import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../config/colors';

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 90,
    backgroundColor: colors.primaryWhite,
  },
});
