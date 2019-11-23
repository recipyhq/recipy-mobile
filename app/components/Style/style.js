import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../config/colors';

const style = EStyleSheet.create({
  container: {
    marginLeft: 5,
    marginTop: 25,
    padding: 5,
    backgroundColor: colors.mediumGrey,
    borderRadius: 7,
    height: 300,
  },
  containerShopList: {
    marginLeft: 5,
    marginTop: 25,
    padding: 5,
    backgroundColor: colors.mediumGrey,
    borderRadius: 7,
    height: 130,
  },
  touch: {
    width: '50%',
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 0,
    justifyContent: 'center',
  },
  imageStyle: {
    flexGrow: 0.8,
    width: '100%',
    height: '10%',
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

  shoppingListTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 10,
    marginBottom: 10,
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
  tagTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.primaryGrey,
  },
  listItem: {
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: 'row',
    borderRadius: 1,
    borderBottomWidth: 0.2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
  title: {
    fontSize: 25,
    margin: 5,
    color: colors.primaryGrey,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: colors.primaryGrey,
  },
  btnSendForm: {
    width: '100%',
    backgroundColor: colors.primaryGrey,
    padding: 10,
  },
});

export default style;
