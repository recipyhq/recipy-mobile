import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../../config/colors';

export default EStyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryOrange,
    marginBottom: 20,
  },
  container: {
    margin: 30,
  },
  welcome: {
    color: colors.primaryGrey,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  btnSendForm: {
    backgroundColor: colors.primaryGrey,
    padding: 15,
    marginTop: 20,
  },
});
