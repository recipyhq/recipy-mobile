import React, { Component } from 'react';
import {
  Text, SectionList, ScrollView, Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { changeEmail } from '../../actions/user';
import ButtonStd from '../../components/Buttons/ButtonStd';
import colors from '../../config/colors';
import styles from './styles';
import { resetPassword } from '../../api/user';


const style = EStyleSheet.create({
  // Section Title
  sectionTitle: {
    fontSize: 20,
    paddingTop: 10,
    textAlign: 'center',
  },

  // Section Text
  sectionText: {
    paddingLeft: 20,
  },
});

class ForgottenPassword extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      isLoading: PropTypes.bool,
    };
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handlePressBack() {
    const { navigation } = this.props;
    navigation.navigate('Home');
  }

  handleEmailChange(email) {
    const { dispatch } = this.props;
    dispatch(changeEmail(email));
  }

  handlePressSend(user) {
    const { dispatch } = this.props;
    resetPassword(dispatch, user);
  }

  render() {
    return (
      <ScrollView>
        <ButtonStd
          onPress={() => (this.handlePressBack())}
          title="Retour"
          leftIcon={{
            name: 'arrow-left',
            color: colors.primaryGrey,
            size: 15,
            type: 'font-awesome',
          }}
          buttonStyle={styles.btnBack}
          transparent
          color={colors.primaryGrey}
          fontSize={20}
        />
        <Text
          style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}
        >
            Welsh de Papa Fossaert
        </Text>
        <Image
          style={{
            width: 300, height: 200, alignItems: 'center',
          }}
          source={{ uri: 'http://leflobart-leportel.fr/wp-content/uploads/2016/08/welsh.png' }}
        />
        <SectionList
          sections={[
            { title: 'Ingrédients (4 personnes)', data: ['-1000g de cheddar', '-4 grosses tranche de pains', '-4 tranches de jambon', '-2 cuillères de moutardes', '-1 verre de bière', '-Poivre'] },
            { title: 'Matériel', data: ['-Casserole', '-Four', '-Cuiellere en bois/plastique', '-Grille pain'] },
          ]}
          renderItem={({ item }) => <Text style={style.sectionText}>{item}</Text>}
          renderSectionHeader={
              ({ section }) => <Text style={style.sectionTitle}>{section.title}</Text>
            }
          keyExtractor={(item, index) => index}
        />
        <SectionList
          sections={[
            { title: 'Préparation', data: ['-Dans une grille pain ou au four, faire griller les tranches de pains, les poser dans un plat avec la tranche de jambon par dessus', '-Faire chauffer la bière dans une casserole', '-Ajouter les cheddar au fur et à mesure et mélanger sans cesse. Ajouter la moutarde et le poivre', '-Mélanger jusqua obtenir un textur homogène', '-Faire couler le cheddar fondu sur chaque tranche de pain', '-Enfourner 20 minutes à 180 degrès en chaleur tournante et déguster !', 'test', 'test', 'test', 'test', 'test', 'test'] },
          ]}
          renderItem={({ item }) => <Text style={style.sectionText}>{item}</Text>}
          renderSectionHeader={
              ({ section }) => <Text style={style.sectionTitle}>{section.title}</Text>
            }
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    );
  }
}


ForgottenPassword.defaultProps = {
  isLoading: false,
};

const mapStateToProps = state => ({
  user: {
    email: state.user.email,
  },
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps)(ForgottenPassword);
