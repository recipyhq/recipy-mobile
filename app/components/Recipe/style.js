import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../config/colors';

const style = EStyleSheet.create({
  container: {
    marginLeft: 5,
    marginTop: 15,
    padding: 5,
    backgroundColor: colors.lightGrey,
    width: '35%',
    height: 180,
    borderRadius: 5,
  },
  imageStyle: {
    flexGrow: 1,
    width: '100%',
    height: 80,
  },
  userStyle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  pageTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },

  recipeTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    color: colors.primaryWhite,
  },

  attribute: {
    fontSize: 12,
    color: colors.primaryWhite,
    paddingRight: 5,
    marginTop: 15,
  },
});

export default style;
