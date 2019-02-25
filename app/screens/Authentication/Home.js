import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, View } from 'react-native';
import * as SecureStore from 'expo/src/SecureStore';
import Logo from '../../components/Logo/Logo';
import ContainerView from '../../components/ContainerView/ContainerView';
import ButtonStd from '../../components/Buttons/ButtonStd';
import colors from '../../config/colors';
import BackgroundImage from '../../components/Backgrounds/BackgroundImage/BackgroundImage';

const imageSize = Dimensions.get('window').width / 2;
const backgroundImage = require('../../../assets/bg-auth.jpg');

const style = EStyleSheet.create({
  // SignIn Button
  btnSignIn: {
    marginTop: 15,
    width: 150,
    position: 'absolute',
    right: 10,
  },

  // SignUp Button
  btnSignUp: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: colors.primaryOrange,
    padding: 15,
    flexDirection: 'row',
  },

  // Forgotten Password Button
  btnForgottenPassword: {
    marginBottom: 30,
    backgroundColor: colors.primaryGrey,
    padding: 15,
    flexDirection: 'row',
  },

  // Divers
  logo: {
    marginTop: 150,
    alignItems: 'center',
  },

  buttonContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
});


class Home extends Component {
  componentWillMount() {
    const { navigation } = this.props;
    SecureStore.getItemAsync('uid').then((uid) => {
      if (uid) { navigation.navigate('Cooker'); }
    });
  }

  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
    };
  }

  handlePressSignUp() {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  }

  handlePressSignIn() {
    const { navigation } = this.props;
    navigation.navigate('SignIn');
  }

  handlePressForgottenPassword() {
    const { navigation } = this.props;
    navigation.navigate('ForgottenPassword');
  }

  render() {
    return (
      <ContainerView>
        <BackgroundImage image={backgroundImage}>
          <ButtonStd
            onPress={() => this.handlePressSignIn()}
            title="Se connecter"
            rightIcon={{
              name: 'arrow-right',
              color: colors.primaryWhite,
              size: 15,
              type: 'font-awesome',
            }}
            buttonStyle={style.btnSignIn}
            transparent
            color={colors.primaryWhite}
            fontSize={20}
          />
          <Logo style={style.logo} width={imageSize} height={imageSize} />
          <View style={style.buttonContainer}>
            <ButtonStd
              onPress={() => this.handlePressSignUp()}
              title="Créer un compte"
              buttonStyle={style.btnSignUp}
              borderRadius={30}
              fontSize={20}
              color={colors.primaryGrey}
            />
            <ButtonStd
              onPress={() => this.handlePressForgottenPassword()}
              title="Mot de passe oublié ?"
              buttonStyle={style.btnForgottenPassword}
              borderRadius={30}
              fontSize={20}
              color={colors.primaryWhite}
            />
          </View>
        </BackgroundImage>
      </ContainerView>
    );
  }
}

export default connect()(Home);
