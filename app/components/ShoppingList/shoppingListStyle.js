import EStyleSheet from 'react-native-extended-stylesheet';

const shoppingListStyle = EStyleSheet.create({

  listItem: {
    marginTop: 5,
    flexDirection: 'row',
    borderRadius: 2,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginBottom: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default shoppingListStyle;
