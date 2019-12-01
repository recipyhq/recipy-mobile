import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../config/colors';

const descriptionStyle = EStyleSheet.create({
  // Section Title
  sectionTitle: {
    fontSize: 25,
    margin: 5,
    color: colors.primaryOrange,
  },
  sectionStep: {
    fontSize: 18,
    color: colors.primaryOrange,
    marginLeft: 25,
  },

  // Section Text
  sectionText: {
    paddingLeft: 45,
    fontSize: 15,
  },

  pageTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: colors.primaryWhite,
  },
  pageTitleBlack: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: colors.primaryGrey,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.primaryOrange,
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryGrey,
  },
  infoContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 15,
    marginBottom: 10,
    width: '25%',
  },
  indicator: {
    fontSize: 12,
    color: colors.mediumGrey,
    textAlign: 'center',
  },

  information: {
    fontSize: 13,
    color: colors.primaryWhite,
  },

  informationEnd: {
    fontSize: 30,
    color: colors.primaryOrange,
  },

  imageStyle: {
    width: '100%',
    height: 275,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: colors.primaryGrey,
  },
  buttonContainerWithSpace: {
    width: '100%',
    backgroundColor: colors.primaryGrey,
    marginTop: 2,
    marginBottom: 2,
  },
  btnGrey: {
    width: '100%',
    backgroundColor: colors.primaryGrey,
    padding: 10,
  },
  btnOrange: {
    width: '100%',
    backgroundColor: colors.primaryOrange,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  // Advices
  advicesContainer: {
    backgroundColor: colors.primaryGrey,
    padding: 15,
    paddingTop: 30,
    marginTop: 30,
  },
  adviceContainerTitle: {
    color: colors.primaryOrange,
    fontSize: 20,
    fontWeight: 'bold',
  },
  noAdviceText: {
    color: colors.primaryWhite,
    fontSize: 15,
    marginBottom: 10,
  },
  btnLeaveAdvice: {
    backgroundColor: colors.primaryOrange,
  },
});

export default descriptionStyle;
