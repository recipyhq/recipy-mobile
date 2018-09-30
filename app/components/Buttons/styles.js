import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 10,
  },
  wrapper: {
    backgroundColor: '$primaryGrey',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 15,
  },
  wrapperLink: {
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 15,
  },
  text: {
    color: '$primaryWhite',
    fontSize: 20,
  },
  textLink: {
    color: '$primaryGrey',
    fontSize: 20,
  },
});
