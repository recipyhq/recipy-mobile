import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../../config/colors';

const style = EStyleSheet.create({
  container: {
    marginLeft: 5,
    marginTop: 25,
    padding: 5,
    backgroundColor: colors.mediumGrey,
    width: 250,
    height: 250,
    borderRadius: 7,
  },
  imageStyle: {
    flexGrow: 0.8,
    width: '100%',
    height: 70,
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

  recipeBookTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.primaryWhite,
    marginLeft: 5,
  },
  description: {
    fontSize: 12,
    color: colors.primaryWhite,
    marginTop: 15,
    marginLeft: 5,
  },
});

export default style;
