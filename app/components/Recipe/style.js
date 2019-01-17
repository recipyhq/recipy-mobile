import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../config/colors';

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

  recipeTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.primaryWhite,
    marginLeft: 5,
  },

  difficultyText: {
    marginTop: 8,
    marginLeft: 5,
    color: colors.primaryWhite,
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 10,
  },
  difficultyBar: {
    marginTop: 2,
    marginLeft: 5,
    marginRight: 10,
  },
  description: {
    fontSize: 12,
    color: colors.primaryWhite,
    marginTop: 15,
    marginLeft: 5,
  },
  attribute: {
    fontSize: 12,
    color: colors.primaryWhite,
    marginTop: 5,
    marginLeft: 5,
  },
  score: {
    fontSize: 12,
    color: colors.primaryWhite,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default style;
