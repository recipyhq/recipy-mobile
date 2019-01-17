import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../config/colors';

const descriptionStyle = EStyleSheet.create({
  // Section Title
  sectionTitle: {
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 10,
    margin: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.veryLightGrey,
    textAlign: 'center',
  },

  sectionTitleBorder: {
    fontSize: 20,
    paddingTop: 10,
    textAlign: 'center',
    borderRadius: 2,
    borderTopWidth: 0.5,
    borderColor: '#d6d7da',
  },

  sectionStep: {
    fontSize: 15,
    paddingTop: 10,
    color: colors.primaryOrange,
  },

  // Section Text
  sectionText: {
    paddingLeft: 20,
  },

  pageTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },

  infoContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 15,
    marginBottom: 10,
    borderRightWidth: 0.5,
  },
  infoContainerLast: {
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 15,
    marginBottom: 10,
  },
  indicator: {
    fontSize: 12,
    color: colors.mediumGrey,
    textAlign: 'center',
  },

  information: {
    fontSize: 30,
    color: colors.primaryOrange,
  },

  informationEnd: {
    fontSize: 30,
    color: colors.primaryOrange,
  },

  imageStyle: {
    width: 275,
    height: 275,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '12%',
  },
});

export default descriptionStyle;
