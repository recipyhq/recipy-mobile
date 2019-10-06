import EStyleSheet from 'react-native-extended-stylesheet';

const shoppingStyle = EStyleSheet.create({
  infoView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    width: '50%',
  },
});

export default shoppingStyle;
