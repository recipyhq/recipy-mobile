import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../../../config/colors';

const style = EStyleSheet.create({
  container: {
  },
  recipeDescription: {
    marginBottom: 10,
  },
  recipeTimeContainer: {
    backgroundColor: '#FF0000',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  recipeTimeIcon: {
    marginBottom: 10,
  },
  recipeTime: {
    marginBottom: 10,
    color: colors.primaryOrange,
  },
});

export default style;
