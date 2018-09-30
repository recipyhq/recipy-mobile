import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const imageSize = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    width: imageSize,
    height: imageSize,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    marginTop: 15,
    color: '$primaryOrange',
  },
});
