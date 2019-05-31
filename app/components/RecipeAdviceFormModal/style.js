import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../config/colors';

const style = EStyleSheet.create({
  background: {
    backgroundColor: '#ffffff88',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    backgroundColor: colors.primaryGrey,
    padding: 15,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    margin: 15,
    alignSelf: 'center',
  },
  // Header
  modalTitle: {
    color: colors.primaryWhite,
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  label: {
    color: colors.primaryWhite,
    fontSize: 14,
  },
  input: {
    color: colors.primaryWhite,
  },
});

export default style;
