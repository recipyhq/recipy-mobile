import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../config/colors';

export default EStyleSheet.create({
  // Back Button
  btnBack: {
    marginTop: 15,
    width: 110,
  },

  // Button Container

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 30,
  },

  btnSendForm: {
    backgroundColor: colors.primaryGrey,
    padding: 15,
  },

});
