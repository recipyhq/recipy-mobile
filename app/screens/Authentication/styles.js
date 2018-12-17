import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../config/colors';

export default EStyleSheet.create({
  // container form
  containerForm: {
    backgroundColor: colors.primaryWhite,
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    flexDirection: 'column',
  },

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
